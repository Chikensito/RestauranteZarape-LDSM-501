(function () {
    let alimentoSeleccionadoId = null;

    async function cargarFragmentos() {
        const respuestas = await Promise.all([
            fetch("Alimentos.html"),
            fetch("VerAlimentos.html")
        ]);

        const html = await Promise.all(respuestas.map(function (respuesta) {
            return respuesta.text();
        }));

        document.getElementById("contenido").innerHTML = html[0];
        document.getElementById("ver").innerHTML = html[1];
    }

    function obtenerAlimentos() {
        return window.zarapeStore.getAlimentos();
    }

    function guardarAlimentos(alimentos) {
        window.zarapeStore.saveAlimentos(alimentos);
    }

    function limpiarFormulario() {
        alimentoSeleccionadoId = null;
        document.getElementById("txtIdProducto").value = "";
        document.getElementById("txtNombreAli").value = "";
        document.getElementById("txtDescripcion").value = "";
        document.getElementById("txtRutaFotoAli").value = "";
        document.getElementById("txtRutaFotoAli").dataset.currentFile = "";
        document.getElementById("txtPrecio").value = "";
        document.getElementById("txtIdCategoria").value = "";
        document.getElementById("txtActivoAli").value = "1";
    }

    function leerFormulario() {
        const inputFoto = document.getElementById("txtRutaFotoAli");
        const nuevoArchivo = inputFoto.files && inputFoto.files.length > 0 ? inputFoto.files[0].name : "";

        return {
            idAlimento: alimentoSeleccionadoId,
            idProducto: Number(document.getElementById("txtIdProducto").value || 0),
            nombre: document.getElementById("txtNombreAli").value.trim(),
            descripcion: document.getElementById("txtDescripcion").value.trim(),
            foto: nuevoArchivo || inputFoto.dataset.currentFile || "",
            precio: Number(document.getElementById("txtPrecio").value || 0),
            idCategoria: Number(document.getElementById("txtIdCategoria").value || 0),
            activo: Number(document.getElementById("txtActivoAli").value || 1)
        };
    }

    function validarFormulario(alimento) {
        if (!alimento.nombre) {
            window.zarapeStore.showMessage("Dato faltante", "Captura el nombre del alimento.", "warning");
            return false;
        }

        if (alimento.precio <= 0) {
            window.zarapeStore.showMessage("Precio invalido", "El precio del alimento debe ser mayor a cero.", "warning");
            return false;
        }

        if (alimento.idCategoria <= 0) {
            window.zarapeStore.showMessage("Categoria invalida", "Captura un id de categoria valido.", "warning");
            return false;
        }

        return true;
    }

    function cargarFormulario(alimento) {
        alimentoSeleccionadoId = alimento.idAlimento;
        document.getElementById("txtIdProducto").value = alimento.idProducto;
        document.getElementById("txtNombreAli").value = alimento.nombre;
        document.getElementById("txtDescripcion").value = alimento.descripcion;
        document.getElementById("txtRutaFotoAli").value = "";
        document.getElementById("txtRutaFotoAli").dataset.currentFile = alimento.foto || "";
        document.getElementById("txtPrecio").value = alimento.precio;
        document.getElementById("txtIdCategoria").value = alimento.idCategoria;
        document.getElementById("txtActivoAli").value = String(alimento.activo);
    }

    function renderizarTabla() {
        const tbody = document.getElementById("tbAlimentos");
        const alimentos = obtenerAlimentos();

        tbody.innerHTML = alimentos.map(function (alimento) {
            return [
                "<tr>",
                "<td>" + alimento.idAlimento + "</td>",
                "<td>" + alimento.idProducto + "</td>",
                "<td>" + alimento.nombre + "</td>",
                "<td>" + alimento.descripcion + "</td>",
                "<td>" + (alimento.foto || "Sin foto") + "</td>",
                "<td>" + window.zarapeStore.formatCurrency(alimento.precio) + "</td>",
                "<td>" + alimento.idCategoria + "</td>",
                "<td>" + (Number(alimento.activo) === 1 ? "Activo" : "Baja") + "</td>",
                "<td><button type=\"button\" onclick=\"seleccionarAlimento(" + alimento.idAlimento + ");\">Ver</button></td>",
                "<td><button type=\"button\" onclick=\"eliminarAlimento(" + alimento.idAlimento + ");\">Eliminar</button></td>",
                "</tr>"
            ].join("");
        }).join("");
    }

    async function cargarAlimentos() {
        await cargarFragmentos();
        document.getElementById("btnNuevoAlimento").addEventListener("click", limpiarFormulario);
        limpiarFormulario();
        renderizarTabla();
    }

    function seleccionarAlimento(idAlimento) {
        const alimento = obtenerAlimentos().find(function (item) {
            return Number(item.idAlimento) === Number(idAlimento);
        });

        if (!alimento) {
            return;
        }

        cargarFormulario(alimento);
    }

    function insertarAlimento() {
        const alimentos = obtenerAlimentos();
        const alimento = leerFormulario();

        if (!validarFormulario(alimento)) {
            return;
        }

        alimento.idAlimento = window.zarapeStore.nextId(alimentos, "idAlimento");
        alimento.idProducto = window.zarapeStore.nextId(alimentos, "idProducto");
        alimentos.push(alimento);
        guardarAlimentos(alimentos);
        renderizarTabla();
        cargarFormulario(alimento);
        window.zarapeStore.showMessage("Alimento agregado", "El alimento ya esta disponible para usarlo en combos.", "success");
    }

    function modificarAlimento() {
        if (!alimentoSeleccionadoId) {
            window.zarapeStore.showMessage("Seleccion requerida", "Primero selecciona un alimento para modificar.", "warning");
            return;
        }

        const alimentos = obtenerAlimentos();
        const indice = alimentos.findIndex(function (item) {
            return Number(item.idAlimento) === Number(alimentoSeleccionadoId);
        });

        if (indice < 0) {
            return;
        }

        const alimento = leerFormulario();
        if (!validarFormulario(alimento)) {
            return;
        }

        alimento.idAlimento = alimentoSeleccionadoId;
        alimento.idProducto = alimentos[indice].idProducto;
        alimentos[indice] = alimento;
        guardarAlimentos(alimentos);
        renderizarTabla();
        cargarFormulario(alimento);
        window.zarapeStore.showMessage("Alimento actualizado", "Los cambios ya quedaron guardados.", "success");
    }

    function eliminarAlimento(idAlimento) {
        const alimentos = obtenerAlimentos();
        const indice = alimentos.findIndex(function (item) {
            return Number(item.idAlimento) === Number(idAlimento);
        });

        if (indice < 0) {
            return;
        }

        const combosRelacionados = window.zarapeStore.getCombos().some(function (combo) {
            return combo.detalles.some(function (detalle) {
                return Number(detalle.idAlimento) === Number(idAlimento);
            });
        });

        if (combosRelacionados) {
            alimentos[indice].activo = 0;
            guardarAlimentos(alimentos);
            renderizarTabla();
            if (Number(alimentoSeleccionadoId) === Number(idAlimento)) {
                cargarFormulario(alimentos[indice]);
            }
            window.zarapeStore.showMessage("Baja aplicada", "El alimento esta ligado a un combo y solo se cambio a baja.", "info");
            return;
        }

        alimentos.splice(indice, 1);
        guardarAlimentos(alimentos);
        if (Number(alimentoSeleccionadoId) === Number(idAlimento)) {
            limpiarFormulario();
        }
        renderizarTabla();
        window.zarapeStore.showMessage("Alimento eliminado", "El registro se elimino del catalogo.", "success");
    }

    window.cargarAlimentos = cargarAlimentos;
    window.seleccionarAlimento = seleccionarAlimento;
    window.insertarAlimento = insertarAlimento;
    window.modificarAlimento = modificarAlimento;
    window.cancelarAlimento = limpiarFormulario;
    window.eliminarAlimento = eliminarAlimento;
}());
