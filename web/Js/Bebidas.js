(function () {
    let bebidaSeleccionadaId = null;

    async function cargarFragmentos() {
        const respuestas = await Promise.all([
            fetch("Bebidas.html"),
            fetch("VerBebidas.html")
        ]);

        const html = await Promise.all(respuestas.map(function (respuesta) {
            return respuesta.text();
        }));

        document.getElementById("contenido").innerHTML = html[0];
        document.getElementById("ver").innerHTML = html[1];
    }

    function obtenerBebidas() {
        return window.zarapeStore.getBebidas();
    }

    function guardarBebidas(bebidas) {
        window.zarapeStore.saveBebidas(bebidas);
    }

    function limpiarFormulario() {
        bebidaSeleccionadaId = null;
        document.getElementById("txtIdBebida").value = "";
        document.getElementById("txtNombreBebida").value = "";
        document.getElementById("txtDescripcionBebida").value = "";
        document.getElementById("txtRutaFotoBebida").value = "";
        document.getElementById("txtRutaFotoBebida").dataset.currentFile = "";
        document.getElementById("txtPrecioBebida").value = "";
        document.getElementById("txtCategoriaBebida").value = "";
        document.getElementById("txtActivoBebida").value = "1";
    }

    function leerFormulario() {
        const inputFoto = document.getElementById("txtRutaFotoBebida");
        const nuevoArchivo = inputFoto.files && inputFoto.files.length > 0 ? inputFoto.files[0].name : "";

        return {
            idBebida: bebidaSeleccionadaId,
            idProducto: 0,
            nombre: document.getElementById("txtNombreBebida").value.trim(),
            descripcion: document.getElementById("txtDescripcionBebida").value.trim(),
            foto: nuevoArchivo || inputFoto.dataset.currentFile || "",
            precio: Number(document.getElementById("txtPrecioBebida").value || 0),
            categoria: document.getElementById("txtCategoriaBebida").value.trim(),
            activo: Number(document.getElementById("txtActivoBebida").value || 1)
        };
    }

    function validarFormulario(bebida) {
        if (!bebida.nombre) {
            window.zarapeStore.showMessage("Dato faltante", "Captura el nombre de la bebida.", "warning");
            return false;
        }

        if (bebida.precio <= 0) {
            window.zarapeStore.showMessage("Precio invalido", "La bebida debe tener un precio mayor a cero.", "warning");
            return false;
        }

        if (!bebida.categoria) {
            window.zarapeStore.showMessage("Categoria faltante", "Indica la categoria de la bebida.", "warning");
            return false;
        }

        return true;
    }

    function cargarFormulario(bebida) {
        bebidaSeleccionadaId = bebida.idBebida;
        document.getElementById("txtIdBebida").value = bebida.idBebida;
        document.getElementById("txtNombreBebida").value = bebida.nombre;
        document.getElementById("txtDescripcionBebida").value = bebida.descripcion;
        document.getElementById("txtRutaFotoBebida").value = "";
        document.getElementById("txtRutaFotoBebida").dataset.currentFile = bebida.foto || "";
        document.getElementById("txtPrecioBebida").value = bebida.precio;
        document.getElementById("txtCategoriaBebida").value = bebida.categoria;
        document.getElementById("txtActivoBebida").value = String(bebida.activo);
    }

    function renderizarTabla() {
        const tbody = document.getElementById("tbBebidas");
        const bebidas = obtenerBebidas();

        tbody.innerHTML = bebidas.map(function (bebida) {
            return [
                "<tr>",
                "<td>" + bebida.idBebida + "</td>",
                "<td>" + bebida.idProducto + "</td>",
                "<td>" + bebida.nombre + "</td>",
                "<td>" + bebida.descripcion + "</td>",
                "<td>" + (bebida.foto || "Sin foto") + "</td>",
                "<td>" + window.zarapeStore.formatCurrency(bebida.precio) + "</td>",
                "<td>" + bebida.categoria + "</td>",
                "<td>" + (Number(bebida.activo) === 1 ? "Activo" : "Baja") + "</td>",
                "<td><button type=\"button\" onclick=\"seleccionarBebida(" + bebida.idBebida + ");\">Ver</button></td>",
                "<td><button type=\"button\" onclick=\"eliminarBebida(" + bebida.idBebida + ");\">Eliminar</button></td>",
                "</tr>"
            ].join("");
        }).join("");
    }

    async function cargarBebidas() {
        await cargarFragmentos();
        document.getElementById("btnNuevoBebida").addEventListener("click", limpiarFormulario);
        limpiarFormulario();
        renderizarTabla();
    }

    function seleccionarBebida(idBebida) {
        const bebida = obtenerBebidas().find(function (item) {
            return Number(item.idBebida) === Number(idBebida);
        });

        if (!bebida) {
            return;
        }

        cargarFormulario(bebida);
    }

    function insertarBebida() {
        const bebidas = obtenerBebidas();
        const bebida = leerFormulario();

        if (!validarFormulario(bebida)) {
            return;
        }

        bebida.idBebida = window.zarapeStore.nextId(bebidas, "idBebida");
        bebida.idProducto = window.zarapeStore.nextId(bebidas, "idProducto");
        bebidas.push(bebida);
        guardarBebidas(bebidas);
        renderizarTabla();
        cargarFormulario(bebida);
        window.zarapeStore.showMessage("Bebida agregada", "La bebida ya forma parte del catalogo.", "success");
    }

    function modificarBebida() {
        if (!bebidaSeleccionadaId) {
            window.zarapeStore.showMessage("Seleccion requerida", "Selecciona una bebida para modificar.", "warning");
            return;
        }

        const bebidas = obtenerBebidas();
        const indice = bebidas.findIndex(function (item) {
            return Number(item.idBebida) === Number(bebidaSeleccionadaId);
        });

        if (indice < 0) {
            return;
        }

        const bebida = leerFormulario();
        if (!validarFormulario(bebida)) {
            return;
        }

        bebida.idBebida = bebidaSeleccionadaId;
        bebida.idProducto = bebidas[indice].idProducto;
        bebidas[indice] = bebida;
        guardarBebidas(bebidas);
        renderizarTabla();
        cargarFormulario(bebida);
        window.zarapeStore.showMessage("Bebida actualizada", "Los cambios ya se guardaron.", "success");
    }

    function eliminarBebida(idBebida) {
        const bebidas = obtenerBebidas();
        const indice = bebidas.findIndex(function (item) {
            return Number(item.idBebida) === Number(idBebida);
        });

        if (indice < 0) {
            return;
        }

        const combosRelacionados = window.zarapeStore.getCombos().some(function (combo) {
            return combo.detalles.some(function (detalle) {
                return Number(detalle.idBebida) === Number(idBebida);
            });
        });

        if (combosRelacionados) {
            bebidas[indice].activo = 0;
            guardarBebidas(bebidas);
            renderizarTabla();
            if (Number(bebidaSeleccionadaId) === Number(idBebida)) {
                cargarFormulario(bebidas[indice]);
            }
            window.zarapeStore.showMessage("Baja aplicada", "La bebida se usa en un combo y solo se marco como baja.", "info");
            return;
        }

        bebidas.splice(indice, 1);
        guardarBebidas(bebidas);
        if (Number(bebidaSeleccionadaId) === Number(idBebida)) {
            limpiarFormulario();
        }
        renderizarTabla();
        window.zarapeStore.showMessage("Bebida eliminada", "El registro se elimino del catalogo.", "success");
    }

    window.cargarBebidas = cargarBebidas;
    window.seleccionarBebida = seleccionarBebida;
    window.insertarBebida = insertarBebida;
    window.modificarBebida = modificarBebida;
    window.cancelarBebida = limpiarFormulario;
    window.eliminarBebida = eliminarBebida;
}());
