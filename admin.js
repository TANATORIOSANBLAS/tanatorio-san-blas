/* ==========================================
   PANEL DE ADMINISTRACIÓN
   TANATORIO SAN BLAS
========================================== */

let salaActual = 0;

//======================================
// BOTONES
//======================================

document.getElementById("btnSala1").addEventListener("click", () => {

    seleccionarSala(0);

});

document.getElementById("btnSala2").addEventListener("click", () => {

    seleccionarSala(1);

});

//======================================
// SELECCIONAR SALA
//======================================

function seleccionarSala(numero){

    salaActual = numero;

    cargarFormulario();

}

//======================================
// CARGAR FORMULARIO
//======================================

function cargarFormulario(){

    const servicio = servicios[salaActual];

    document.getElementById("nombre").value = servicio.nombre;
    document.getElementById("parroquia").value = servicio.parroquia;
    document.getElementById("misa").value = servicio.misa;
    document.getElementById("fondo").value = servicio.fondo;
    document.getElementById("colorTexto").value = servicio.colorTexto;

}

//======================================
// INICIO
//======================================

seleccionarSala(0);