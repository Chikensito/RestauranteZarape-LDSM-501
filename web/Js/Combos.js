(function () {
    let comboSeleccionadoId = null;
    let busquedaActual = "";

    async function cargarFragmentos() {
        const respuestas = await Promise.all([
            fetch("Combos.html"),
            fetch("VerCombos.html")
        ]);

        const html = await Promise.all(respuestas.map(function (respuesta) {
            return respuesta.text();
        }));

        document.getElementById("contenido").innerHTML = html[0];
        document.getElementById("ver").innerHTML = html[1];
    }

    function obtenerCombos() {
        return window.zarapeStore.getCombos();
    }

    function guardarCombos(combos) {
        window.zarapeStore.saveCombos(combos);
    }

    function normalizarTexto(texto) {
        return String(texto || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    function limpiarFormulario() {
        comboSeleccionadoId = null;
        document.getElementById("txtIdCombo").value = "";
        document.getElementById("txtNombreCombo").value = "";
        document.getElementById("txtDescripcionCombo").value = "";
        document.getElementById("txtPrecioCombo").value = "";
        document.getElementById("txtActivoCombo").value = "1";
        renderizarSelectores(null);
        renderizarResumen();
    }

    function obtenerNombreComponentes(detalles, tipo) {
        return detalles
            .filter(function (detalle) {
                return detalle.tipoComponente === tipo;
            })
            .map(function (detalle) {
                return detalle.nombreProducto;
            })
            .join(", ");
    }

    function filtrarCombos(combos) {
        const termino = normalizarTexto(busquedaActual);

        if (!termino) {
            return combos;
        }

        return combos.filter(function (combo) {
            const nombre = normalizarTexto(combo.nombre);
            const descripcion = normalizarTexto(combo.descripcion);
            const componentes = normalizarTexto(
                combo.detalles.map(function (detalle) {
                    return detalle.nombreProducto;
                }).join(" ")
            );

            return nombre.includes(termino) || descripcion.includes(termino) || componentes.includes(termino);
        });
    }

    function renderizarTabla() {
        const tbody = document.getElementById("tbCombos");
        const combos = filtrarCombos(obtenerCombos());

        tbody.innerHTML = combos.map(function (combo) {
            return [
                "<tr>",
                "<td>" + combo.idCombo + "</td>",
                "<td>" + combo.nombre + "</td>",
                "<td>" + combo.descripcion + "</td>",
                "<td>" + window.zarapeStore.formatCurrency(combo.precio) + "</td>",
                "<td>" + (obtenerNombreComponentes(combo.detalles, "ALIMENTO") || "Sin alimentos") + "</td>",
                "<td>" + (obtenerNombreComponentes(combo.detalles, "BEBIDA") || "Sin bebidas") + "</td>",
                "<td>" + (Number(combo.activo) === 1 ? "Activo" : "Baja") + "</td>",
                "<td>" + (combo.ticketsRelacionados || 0) + "</td>",
                "<td><button type=\"button\" onclick=\"seleccionarCombo(" + combo.idCombo + ");\">Ver</button></td>",
                "<td><button type=\"button\" onclick=\"eliminarCombo(" + combo.idCombo + ");\">Eliminar</button></td>",
                "</tr>"
            ].join("");
        }).join("");
    }

    function crearSelectorItems(items, itemKey, nombreCampo, tipo, seleccionados) {
        if (items.length === 0) {
            return "<p class=\"selector-vacio\">No hay registros disponibles.</p>";
        }

        return items.map(function (item) {
            const itemId = Number(item[itemKey]);
            const marcado = seleccionados.includes(itemId) ? "checked" : "";
            const inactivo = Number(item.activo) !== 1;
            const deshabilitado = inactivo && !seleccionados.includes(itemId) ? "disabled" : "";
            const clase = inactivo ? "selector-item inactivo" : "selector-item";
            const categoria = tipo === "ALIMENTO" ? "Categoria " + item.idCategoria : item.categoria;

            return [
                "<label class=\"" + clase + "\">",
                "<input type=\"checkbox\" data-tipo=\"" + tipo + "\" value=\"" + itemId + "\" " + marcado + " " + deshabilitado + ">",
                "<span class=\"selector-titulo\">" + item[nombreCampo] + "</span>",
                "<small>" + categoria + " | " + window.zarapeStore.formatCurrency(item.precio) + (inactivo ? " | Baja" : "") + "</small>",
                "</label>"
            ].join("");
        }).join("");
    }

    function renderizarSelectores(combo) {
        const alimentos = window.zarapeStore.getAlimentos();
        const bebidas = window.zarapeStore.getBebidas();
        const alimentosSeleccionados = combo ? combo.detalles.filter(function (detalle) {
            return detalle.tipoComponente === "ALIMENTO";
        }).map(function (detalle) {
            return Number(detalle.idAlimento);
        }) : [];
        const bebidasSeleccionadas = combo ? combo.detalles.filter(function (detalle) {
            return detalle.tipoComponente === "BEBIDA";
        }).map(function (detalle) {
            return Number(detalle.idBebida);
        }) : [];

        document.getElementById("listaAlimentosCombo").innerHTML = crearSelectorItems(alimentos, "idAlimento", "nombre", "ALIMENTO", alimentosSeleccionados);
        document.getElementById("listaBebidasCombo").innerHTML = crearSelectorItems(bebidas, "idBebida", "nombre", "BEBIDA", bebidasSeleccionadas);

        document.querySelectorAll("#listaAlimentosCombo input, #listaBebidasCombo input").forEach(function (checkbox) {
            checkbox.addEventListener("change", renderizarResumen);
        });
    }

    function obtenerAlimentosSeleccionados() {
        const alimentos = window.zarapeStore.getAlimentos();
        const ids = Array.from(document.querySelectorAll("#listaAlimentosCombo input:checked")).map(function (elemento) {
            return Number(elemento.value);
        });

        return alimentos.filter(function (alimento) {
            return ids.includes(Number(alimento.idAlimento));
        });
    }

    function obtenerBebidasSeleccionadas() {
        const bebidas = window.zarapeStore.getBebidas();
        const ids = Array.from(document.querySelectorAll("#listaBebidasCombo input:checked")).map(function (elemento) {
            return Number(elemento.value);
        });

        return bebidas.filter(function (bebida) {
            return ids.includes(Number(bebida.idBebida));
        });
    }

    function calcularPrecioSugerido() {
        const alimentos = obtenerAlimentosSeleccionados();
        const bebidas = obtenerBebidasSeleccionadas();

        return alimentos.reduce(function (suma, item) {
            return suma + Number(item.precio);
        }, 0) + bebidas.reduce(function (suma, item) {
            return suma + Number(item.precio);
        }, 0);
    }

    function renderizarResumen() {
        const resumen = document.getElementById("resumenComponentes");
        const alimentos = obtenerAlimentosSeleccionados();
        const bebidas = obtenerBebidasSeleccionadas();
        const total = calcularPrecioSugerido();
        const chips = alimentos.concat(bebidas).map(function (item) {
            return "<span class=\"combo-chip\">" + item.nombre + "</span>";
        }).join("");

        resumen.innerHTML = [
            "<div class=\"resumen-linea\"><strong>Alimentos:</strong> " + alimentos.length + "</div>",
            "<div class=\"resumen-linea\"><strong>Bebidas:</strong> " + bebidas.length + "</div>",
            "<div class=\"resumen-linea\"><strong>Precio sugerido:</strong> " + window.zarapeStore.formatCurrency(total) + "</div>",
            "<div class=\"combo-chip-wrap\">" + (chips || "<span class=\"combo-chip vacio\">Sin componentes seleccionados</span>") + "</div>"
        ].join("");
    }

    function calcularPrecioCombo() {
        document.getElementById("txtPrecioCombo").value = calcularPrecioSugerido().toFixed(2);
    }

    function leerFormulario() {
        return {
            idCombo: comboSeleccionadoId,
            nombre: document.getElementById("txtNombreCombo").value.trim(),
            descripcion: document.getElementById("txtDescripcionCombo").value.trim(),
            precio: Number(document.getElementById("txtPrecioCombo").value || 0),
            activo: Number(document.getElementById("txtActivoCombo").value || 1)
        };
    }

    function validarFormulario(combo) {
        const alimentos = obtenerAlimentosSeleccionados();
        const bebidas = obtenerBebidasSeleccionadas();

        if (!combo.nombre) {
            window.zarapeStore.showMessage("Dato faltante", "Captura el nombre del combo.", "warning");
            return false;
        }

        if (!combo.descripcion) {
            window.zarapeStore.showMessage("Dato faltante", "Captura la descripcion del combo.", "warning");
            return false;
        }

        if (combo.precio <= 0) {
            window.zarapeStore.showMessage("Precio invalido", "El combo debe tener un precio mayor a cero.", "warning");
            return false;
        }

        if (alimentos.length === 0 && bebidas.length === 0) {
            window.zarapeStore.showMessage("Componentes faltantes", "Selecciona al menos un alimento o una bebida.", "warning");
            return false;
        }

        return true;
    }

    function construirDetalles(idCombo) {
        const alimentos = obtenerAlimentosSeleccionados();
        const bebidas = obtenerBebidasSeleccionadas();
        let idDetalle = 1;
        const detalles = [];

        alimentos.forEach(function (alimento) {
            detalles.push({
                idDetalleCombo: idDetalle,
                idCombo: idCombo,
                idAlimento: alimento.idAlimento,
                idBebida: null,
                tipoComponente: "ALIMENTO",
                nombreProducto: alimento.nombre,
                precioUnitario: Number(alimento.precio)
            });
            idDetalle += 1;
        });

        bebidas.forEach(function (bebida) {
            detalles.push({
                idDetalleCombo: idDetalle,
                idCombo: idCombo,
                idAlimento: null,
                idBebida: bebida.idBebida,
                tipoComponente: "BEBIDA",
                nombreProducto: bebida.nombre,
                precioUnitario: Number(bebida.precio)
            });
            idDetalle += 1;
        });

        return detalles;
    }

    function cargarFormulario(combo) {
        comboSeleccionadoId = combo.idCombo;
        document.getElementById("txtIdCombo").value = combo.idCombo;
        document.getElementById("txtNombreCombo").value = combo.nombre;
        document.getElementById("txtDescripcionCombo").value = combo.descripcion;
        document.getElementById("txtPrecioCombo").value = Number(combo.precio).toFixed(2);
        document.getElementById("txtActivoCombo").value = String(combo.activo);
        renderizarSelectores(combo);
        renderizarResumen();
    }

    function seleccionarCombo(idCombo) {
        const combo = obtenerCombos().find(function (item) {
            return Number(item.idCombo) === Number(idCombo);
        });

        if (!combo) {
            return;
        }

        cargarFormulario(combo);
    }

    function insertarCombo() {
        const combos = obtenerCombos();
        const combo = leerFormulario();

        if (!validarFormulario(combo)) {
            return;
        }

        combo.idCombo = window.zarapeStore.nextId(combos, "idCombo");
        combo.ticketsRelacionados = 0;
        combo.detalles = construirDetalles(combo.idCombo);
        combos.push(combo);
        guardarCombos(combos);
        renderizarTabla();
        cargarFormulario(combo);
        window.zarapeStore.showMessage("Combo agregado", "El combo se dio de alta correctamente.", "success");
    }

    function modificarCombo() {
        if (!comboSeleccionadoId) {
            window.zarapeStore.showMessage("Seleccion requerida", "Selecciona un combo para modificar.", "warning");
            return;
        }

        const combos = obtenerCombos();
        const indice = combos.findIndex(function (item) {
            return Number(item.idCombo) === Number(comboSeleccionadoId);
        });

        if (indice < 0) {
            return;
        }

        const combo = leerFormulario();
        if (!validarFormulario(combo)) {
            return;
        }

        combo.idCombo = comboSeleccionadoId;
        combo.ticketsRelacionados = combos[indice].ticketsRelacionados || 0;
        combo.detalles = construirDetalles(comboSeleccionadoId);
        combos[indice] = combo;
        guardarCombos(combos);
        renderizarTabla();
        cargarFormulario(combo);
        window.zarapeStore.showMessage("Combo actualizado", "Se modificaron todos los campos excepto el ID.", "success");
    }

    function eliminarCombo(idCombo) {
        const combos = obtenerCombos();
        const indice = combos.findIndex(function (item) {
            return Number(item.idCombo) === Number(idCombo);
        });

        if (indice < 0) {
            return;
        }

        if (Number(combos[indice].ticketsRelacionados || 0) > 0) {
            combos[indice].activo = 0;
            guardarCombos(combos);
            renderizarTabla();
            if (Number(comboSeleccionadoId) === Number(idCombo)) {
                cargarFormulario(combos[indice]);
            }
            window.zarapeStore.showMessage("Baja aplicada", "El combo tiene registros asociados y solo se cambio a baja.", "info");
            return;
        }

        combos.splice(indice, 1);
        guardarCombos(combos);
        if (Number(comboSeleccionadoId) === Number(idCombo)) {
            limpiarFormulario();
        }
        renderizarTabla();
        window.zarapeStore.showMessage("Combo eliminado", "El registro se elimino correctamente.", "success");
    }

    function eliminarComboDesdeVista() {
        const idCombo = Number(document.getElementById("txtIdCombo").value || comboSeleccionadoId || 0);

        if (!idCombo) {
            window.zarapeStore.showMessage("Seleccion requerida", "Selecciona un combo para eliminar.", "warning");
            return;
        }

        eliminarCombo(idCombo);
    }

    function buscarCombos() {
        busquedaActual = document.getElementById("txtBusquedaCombo").value.trim();
        renderizarTabla();
    }

    function imprimirResultadosCombos() {
        const combos = filtrarCombos(obtenerCombos());
        const ventana = window.open("", "_blank", "width=900,height=700");

        if (!ventana) {
            window.zarapeStore.showMessage("Ventana bloqueada", "Permite las ventanas emergentes para imprimir.", "warning");
            return;
        }

        const filas = combos.map(function (combo) {
            return [
                "<tr>",
                "<td>" + combo.idCombo + "</td>",
                "<td>" + combo.nombre + "</td>",
                "<td>" + combo.descripcion + "</td>",
                "<td>" + window.zarapeStore.formatCurrency(combo.precio) + "</td>",
                "<td>" + obtenerNombreComponentes(combo.detalles, "ALIMENTO") + "</td>",
                "<td>" + obtenerNombreComponentes(combo.detalles, "BEBIDA") + "</td>",
                "<td>" + (Number(combo.activo) === 1 ? "Activo" : "Baja") + "</td>",
                "</tr>"
            ].join("");
        }).join("");

        ventana.document.write([
            "<!DOCTYPE html>",
            "<html lang=\"es\">",
            "<head>",
            "<meta charset=\"UTF-8\">",
            "<title>Reporte de combos</title>",
            "<style>",
            "body{font-family:Arial,sans-serif;padding:24px;color:#222;}",
            "table{width:100%;border-collapse:collapse;margin-top:16px;}",
            "th,td{border:1px solid #999;padding:8px;text-align:left;}",
            "th{background:#BBCF4A;}",
            "h1{color:#A11F0C;}",
            "</style>",
            "</head>",
            "<body>",
            "<h1>Resultados de la busqueda de combos</h1>",
            "<table>",
            "<thead><tr><th>Id</th><th>Nombre</th><th>Descripcion</th><th>Precio</th><th>Alimentos</th><th>Bebidas</th><th>Estatus</th></tr></thead>",
            "<tbody>" + filas + "</tbody>",
            "</table>",
            "</body>",
            "</html>"
        ].join(""));
        ventana.document.close();
        ventana.focus();
        ventana.print();
    }

    async function cargarCombos() {
        await cargarFragmentos();
        document.getElementById("btnNuevoCombo").addEventListener("click", limpiarFormulario);
        document.getElementById("btnBuscarCombo").addEventListener("click", buscarCombos);
        document.getElementById("btnImprimirCombos").addEventListener("click", imprimirResultadosCombos);
        document.getElementById("btnCalcularPrecioCombo").addEventListener("click", calcularPrecioCombo);
        document.getElementById("txtBusquedaCombo").addEventListener("keydown", function (evento) {
            if (evento.key === "Enter") {
                buscarCombos();
            }
        });

        limpiarFormulario();
        renderizarTabla();
    }

    window.cargarCombos = cargarCombos;
    window.seleccionarCombo = seleccionarCombo;
    window.insertarCombo = insertarCombo;
    window.modificarCombo = modificarCombo;
    window.cancelarCombo = limpiarFormulario;
    window.eliminarCombo = eliminarCombo;
    window.eliminarComboDesdeVista = eliminarComboDesdeVista;
    window.calcularPrecioCombo = calcularPrecioCombo;
}());
