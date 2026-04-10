function cargarSucursal() {
    Promise.all([
        fetch("Sucursal.html").then(res => res.text()),
        fetch("VerSucursal.html").then(res => res.text())
    ])
    .then(htmls => {
        document.getElementById("contenido").innerHTML = htmls[0];
        document.getElementById("ver").innerHTML = htmls[1];
        
        if (typeof inicializarSucursal === 'function') {
            inicializarSucursal();
        }
    })
    .catch(err => console.error("Error en módulo Sucursal:", err));
}