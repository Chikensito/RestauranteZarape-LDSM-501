let sucursales = [];

function inicializarSucursal() {
    cargarDesdeBD();
}

function cargarDesdeBD() {
    fetch("http://localhost:8080/RestauranteZarape_kodosPrietos_/api/sucursal/getAll")
        .then(res => res.json())
        .then(data => {
            sucursales = data;
            pintarTablaSucursal();
        })
        .catch(err => console.error("Error al cargar desde BD:", err));
}

function pintarTablaSucursal() {
    let contenidoTabla = "";
    if (sucursales.length === 0) {
        contenidoTabla = `<tr><td colspan="13" style="text-align:center;">No hay sucursales registradas</td></tr>`;
    } else {
        sucursales.forEach((s, i) => {
            let fotoCell = (s.foto && s.foto.trim().length > 0)
                ? `<img src="data:image/jpeg;base64,${s.foto}" style="max-width:60px; max-height:40px; border-radius:4px;">`
                : '-';

            let urlCell = s.urlWeb
                ? `<a href="${s.urlWeb}" target="_blank">Visitar</a>`
                : '-';

            let activoCell = s.activo == 1 ? 'Activo' : 'Inactivo';

            contenidoTabla += `
                <tr>
                    <td>${s.idSucursal}</td>
                    <td>${s.nombre}</td>
                    <td>${s.latitud || '0'}</td>
                    <td>${s.longitud || '0'}</td>
                    <td>${fotoCell}</td>
                    <td>${urlCell}</td>
                    <td>${s.horarios || 'No definido'}</td>
                    <td>${s.calle}</td>
                    <td>${s.numCalle}</td>
                    <td>${s.colonia}</td>
                    <td>${activoCell}</td>
                    <td><button onclick="mostrarDetalleSucursal(${i})">Editar</button></td>
                    <td><button onclick="eliminarSucursal(${s.idSucursal})">Eliminar</button></td>
                </tr>`;
        });
    }
    document.getElementById("tblSucursalesBody").innerHTML = contenidoTabla;
}

function convertirImagenABase64(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = height * (maxWidth / width);
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL("image/jpeg", quality));
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}

async function procesarImagenSucursal(input) {
    if (input.files && input.files[0]) {
        try {
            const base64Completo = await convertirImagenABase64(input.files[0]);
            const base64Puro = base64Completo.replace(/^data:image\/[a-z]+;base64,/, "");
            document.getElementById('txtFotoBase64').value = base64Puro;
            const preview = document.getElementById('imgFotoPreview');
            preview.src = base64Completo;
            preview.style.display = "block";
        } catch (err) {
            Swal.fire("Error", "No se pudo procesar la imagen", "error");
            console.error("Error al convertir imagen:", err);
        }
    }
}

function guardarSucursal() {
    let id     = document.getElementById('txtIdSuc').value;
    let nombre = document.getElementById('txtNombreSuc').value.trim();

    if (!nombre) {
        Swal.fire("Aviso", "El nombre es obligatorio", "warning");
        return;
    }

    let sucursal = {
        idSucursal: id ? parseInt(id) : 0,
        nombre:     nombre,
        horarios:   document.getElementById('txtHorariosSuc').value.trim(),
        calle:      document.getElementById('txtCalleSuc').value.trim(),
        numCalle:   document.getElementById('txtNumeroSuc').value.trim(),
        colonia:    document.getElementById('txtColoniaSuc').value.trim(),
        latitud:    document.getElementById('txtLatitudSuc').value.trim(),
        longitud:   document.getElementById('txtLongitudSuc').value.trim(),
        urlWeb:     document.getElementById('txtUrlSuc').value.trim(),
        foto:       document.getElementById('txtFotoBase64').value,
        activo:     1,
        ciudad:     { idCiudad: 2 }
    };

    let ruta = (sucursal.idSucursal === 0) ? "insert" : "update";
    let params = new URLSearchParams();
    params.append("datos", JSON.stringify(sucursal));

    fetch("http://localhost:8080/RestauranteZarape_kodosPrietos_/api/sucursal/" + ruta, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            Swal.fire("Error", data.error, "error");
        } else {
            Swal.fire("¡Éxito!", "Sucursal guardada correctamente", "success");
            cargarDesdeBD();
            limpiarFormularioSucursal(false);
        }
    })
    .catch(() => Swal.fire("Error", "Error de conexión", "error"));
}

function mostrarDetalleSucursal(index) {
    let s = sucursales[index];

    document.getElementById('txtIdSuc').value       = s.idSucursal;
    document.getElementById('txtNombreSuc').value   = s.nombre;
    document.getElementById('txtHorariosSuc').value = s.horarios  || '';
    document.getElementById('txtCalleSuc').value    = s.calle     || '';
    document.getElementById('txtNumeroSuc').value   = s.numCalle  || '';
    document.getElementById('txtColoniaSuc').value  = s.colonia   || '';
    document.getElementById('txtLatitudSuc').value  = s.latitud   || '';
    document.getElementById('txtLongitudSuc').value = s.longitud  || '';
    document.getElementById('txtUrlSuc').value      = s.urlWeb    || '';

    const preview = document.getElementById('imgFotoPreview');
    if (s.foto && s.foto.trim().length > 0) {
        document.getElementById('txtFotoBase64').value = s.foto;
        preview.src = "data:image/jpeg;base64," + s.foto;
        preview.style.display = "block";
    } else {
        document.getElementById('txtFotoBase64').value = "";
        preview.src = "";
        preview.style.display = "none";
    }

    let seccion = document.getElementById('verSuc');
    if (seccion) seccion.style.display = "block";

    window.scrollTo(0, document.body.scrollHeight);
}

function eliminarSucursal(id) {
    Swal.fire({
        title: '¿Desactivar sucursal?',
        text: 'La sucursal será marcada como inactiva.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, desactivar',
        cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.isConfirmed) {
            let params = new URLSearchParams();
            params.append("idSucursal", id);
            fetch("http://localhost:8080/RestauranteZarape_kodosPrietos_/api/sucursal/delete", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params
            })
            .then(res => res.json())
            .then(() => {
                Swal.fire("Listo", "Sucursal desactivada", "success");
                cargarDesdeBD();
                limpiarFormularioSucursal(false);
            })
            .catch(() => Swal.fire("Error", "Error de conexión", "error"));
        }
    });
}

function eliminarSucursalActual() {
    let id = document.getElementById('txtIdSuc').value;
    if (!id) {
        Swal.fire("Aviso", "No hay sucursal seleccionada para eliminar", "info");
        return;
    }
    eliminarSucursal(parseInt(id));
}

function nuevoSucursal() {
    limpiarFormularioSucursal(true);
}

function limpiarFormularioSucursal(mostrar) {
    let form = document.getElementById('formSucursal');
    if (form) form.reset();

    document.getElementById('txtIdSuc').value      = "";
    document.getElementById('txtFotoBase64').value = "";

    const preview = document.getElementById('imgFotoPreview');
    if (preview) {
        preview.src = "";
        preview.style.display = "none";
    }

    let seccion = document.getElementById('verSuc');
    if (seccion) seccion.style.display = mostrar ? "block" : "none";
}