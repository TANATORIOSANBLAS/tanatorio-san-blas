import { db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

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

//======================================
// GUARDAR EN FIREBASE
//======================================

document.getElementById("guardar").addEventListener("click", guardarServicio);

async function guardarServicio(){

    const servicio = {

        nombre: document.getElementById("nombre").value,

        parroquia: document.getElementById("parroquia").value,

        misa: document.getElementById("misa").value,

        fondo: document.getElementById("fondo").value,

        colorTexto: document.getElementById("colorTexto").value,

        activo: document.getElementById("activo").checked,

        fotos: []

    };

    await setDoc(doc(db, "salas", "sala" + (salaActual + 1)), servicio);

    alert("Servicio guardado correctamente.");

}
