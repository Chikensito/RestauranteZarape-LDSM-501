(function () {
    async function cargarFragmentos() {
        const respuestas = await Promise.all([
            fetch("Usuario.html"),
            fetch("VerUsuario.html")
        ]);

        const html = await Promise.all(respuestas.map(function (respuesta) {
            return respuesta.text();
        }));

        document.getElementById("contenido").innerHTML = html[0];
        document.getElementById("ver").innerHTML = html[1];
    }

    function mostrarPendiente() {
        window.zarapeStore.showMessage("Modulo pendiente", "Se dejo intacta la estructura del modulo Usuario para no mezclar el alcance con el requerimiento de Combos.", "info");
    }

    async function cargarUsuarios() {
        await cargarFragmentos();
        document.getElementById("tbUsuario").innerHTML = "<tr><td colspan=\"9\">Modulo conservado para futuras iteraciones.</td></tr>";
    }

    window.cargarUsuarios = cargarUsuarios;
    window.insertarUsuario = mostrarPendiente;
    window.modificarUsuario = mostrarPendiente;
    window.cancelarUsuario = mostrarPendiente;
    window.eliminarUsuario = mostrarPendiente;
}());
