let actual = 0;
let fotoActual = 0;

function mostrarServicio() {

    const servicio = servicios[actual];

    // Mostrar datos
    document.getElementById("nombre").textContent = servicio.nombre;
    document.getElementById("parroquia").textContent = servicio.parroquia;
    document.getElementById("misa").textContent = servicio.misa;
    document.getElementById("sala").textContent = servicio.sala;

    // Mostrar la foto actual
    document.getElementById("foto").src = servicio.fotos[fotoActual];

    // Cambiar el fondo
    document.body.style.backgroundImage = `url('${servicio.fondo}')`;

    // Cambiar el color del texto
    document.body.classList.remove("texto-blanco", "texto-negro");

    if (servicio.colorTexto === "blanco") {
        document.body.classList.add("texto-blanco");
    } else {
        document.body.classList.add("texto-negro");
    }

}

// Mostrar el primer servicio
mostrarServicio();


// Cambiar de fotografía cada 5 segundos
setInterval(() => {

    const servicio = servicios[actual];

    fotoActual++;

    if (fotoActual >= servicio.fotos.length) {
        fotoActual = 0;
    }

    document.getElementById("foto").src = servicio.fotos[fotoActual];

}, 5000);


// Cambiar de servicio cada 15 segundos
setInterval(() => {

    actual++;

    if (actual >= servicios.length) {
        actual = 0;
    }

    fotoActual = 0;

    mostrarServicio();

}, 15000);