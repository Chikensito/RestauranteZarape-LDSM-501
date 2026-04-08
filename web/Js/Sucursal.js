(function () {
    async function cargarFragmentos() {
        const respuestas = await Promise.all([
            fetch("Sucursal.html"),
            fetch("VerSucursal.html")
        ]);

        const html = await Promise.all(respuestas.map(function (respuesta) {
            return respuesta.text();
        }));

        document.getElementById("contenido").innerHTML = html[0];
        document.getElementById("ver").innerHTML = html[1];
    }

    function mostrarPendiente() {
        window.zarapeStore.showMessage("Modulo pendiente", "La intervencion principal se concentro en Combos. La estructura original de Sucursal se conserva lista para continuar.", "info");
    }

    async function cargarSucursal() {
        await cargarFragmentos();
        document.getElementById("tbSucursal").innerHTML = "<tr><td colspan=\"14\">Modulo conservado para futuras iteraciones.</td></tr>";
    }

    window.cargarSucursal = cargarSucursal;
    window.insertarSuc = mostrarPendiente;
    window.modificarSuc = mostrarPendiente;
    window.cancelarSuc = mostrarPendiente;
    window.eliminarSuc = mostrarPendiente;
}());
