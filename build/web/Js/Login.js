document.addEventListener("DOMContentLoaded",function(){
        const form = document.getElementById("loginForm");
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const user = document.getElementById("txtUsuario").value;
        const password = document.getElementById("txtContrasenia").value;

        fetch("http://localhost:8080/RestauranteZarape_kodosPrietos_/api/login/validar?user=" + user + "&password=" + password)
            .then(response => response.json())
            .then(json => {
               if (json.nombre) {
                    localStorage.setItem("usuarioLogeado", JSON.stringify(json));
                    Swal.fire({
                        title: "¡Login Correcto!",
                        text: "Bienvenido, " + json.nombre,
                        icon: "success",
                        confirmButtonText: "Entrar"
                    }).then(() => {
                        window.location.href = "Html/Principal.html";
                    });

                } else {
                    Swal.fire({
                        title: "Error",
                        text: json.error || "Usuario o contraseña incorrectos",
                        icon: "error"
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error de conexión",
                    text: "No se pudo conectar al servidor",
                    icon: "warning"
                });
            });
    });
});