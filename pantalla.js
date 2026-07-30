/* ==========================================
   TANATORIO SAN BLAS - MOTOR DE PANTALLA
   Versión 2.0
========================================== */

import { db } from "./firebase.js";

import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

let servicios = [];

let escena = 0;

const secuencia = [
    null,
    flores,
    null,
    pueblos,
    null,
    iglesias,
    null,
    santos
];

let servicioActual = 0;
let fotoActual = 0;

//======================================
// MOSTRAR SERVICIO
//======================================

function mostrarServicio() {

    document.body.classList.add("fade-out");

    setTimeout(() => {

        const servicio = servicios[servicioActual];
        if (!servicio) return;

        // Datos
        document.getElementById("nombre").textContent = servicio.nombre;
        document.getElementById("parroquia").textContent = servicio.parroquia;
        document.getElementById("misa").textContent = servicio.misa;
        document.getElementById("sala").textContent = servicio.sala;

        // Fotografía
        document.getElementById("visor").src = servicio.fotos[fotoActual];

        // Fondo
        document.body.style.backgroundImage = `url('${servicio.fondo}')`;

        // Colores
        document.body.classList.remove("texto-blanco");
        document.body.classList.remove("texto-negro");

        if (servicio.colorTexto === "blanco") {

            document.body.classList.add("texto-blanco");
            document.getElementById("logo").src = "imagenes/logos/logob.png";

        } else {

            document.body.classList.add("texto-negro");
            document.getElementById("logo").src = "imagenes/logos/logon.png";

        }

        document.body.classList.remove("fade-out");
        document.body.classList.add("fade-in");

    }, 400);

}
//======================================
// MOSTRAR TRANSICIÓN
//======================================
function mostrarTransicion(transicion){

    document.getElementById("imagenTransicion").src = transicion.imagen;

    if (transicion.color === "blanco") {

        document.getElementById("logo").src = "imagenes/logos/logob.png";

    } else {

        document.getElementById("logo").src = "imagenes/logos/logon.png";

    }

    document.getElementById("pantallaTransicion").style.display = "flex";

}
//======================================
// OCULTAR TRANSICIÓN
//======================================

function ocultarTransicion(){

    document.getElementById("pantallaTransicion").style.display = "none";

}

//======================================
// IMAGEN ALEATORIA
//======================================

function imagenAleatoria(grupo){

    return grupo[Math.floor(Math.random() * grupo.length)];

}

//======================================
// MOSTRAR CATEGORÍA
//======================================

function mostrarCategoria(grupo){

    const transicion = imagenAleatoria(grupo);

    document.getElementById("imagenTransicion").src = transicion.imagen;

    if (transicion.color === "blanco") {

        document.getElementById("logo").src = "imagenes/logos/logob.png";

    } else {

        document.getElementById("logo").src = "imagenes/logos/logon.png";

    }

    document.getElementById("pantallaTransicion").style.display = "flex";

}

//======================================
// SIGUIENTE ESCENA
//======================================

function siguienteEscena(){

    escena++;

    if(escena >= secuencia.length){

        escena = 0;

        siguienteServicio();

        return;

    }

    if(secuencia[escena] === null){

        ocultarTransicion();

        mostrarServicio();

    }else{

        mostrarCategoria(secuencia[escena]);

    }

}

//======================================
// RELOJ
//======================================

function actualizarReloj() {

    const ahora = new Date();

    const horas = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");

    document.getElementById("reloj").textContent = horas + ":" + minutos;

}

//======================================
// CAMBIAR FOTO
//======================================

function siguienteFoto() {

   const servicio = servicios[servicioActual];

    if (!servicio) return;

    fotoActual++;

    if (fotoActual >= servicio.fotos.length) {

        fotoActual = 0;

    }

    mostrarServicio();

}

//======================================
// CAMBIAR SERVICIO
//======================================

function siguienteServicio() {

    servicioActual++;

    if (servicioActual >= servicios.length) {

        servicioActual = 0;

    }

    fotoActual = 0;
    escena = 0;

    mostrarServicio();

}
//======================================
// FIREBASE
//======================================

onSnapshot(collection(db, "salas"), (snapshot) => {

    servicios = [];

    snapshot.forEach((doc) => {

        const servicio = doc.data();

        if (servicio.activo) {

            servicio.sala = doc.id === "sala1" ? "Sala 1" : "Sala 2";

            servicios.push(servicio);

        }

    });

    if (servicios.length === 0) return;

    servicioActual = 0;
    fotoActual = 0;
    escena = 0;

    mostrarServicio();

});

//======================================
// RELOJ
//======================================

actualizarReloj();

setInterval(actualizarReloj, 1000);

//======================================
// MOTOR
//======================================

setInterval(() => {

    if (servicios.length > 0) {

        siguienteEscena();

    }

}, 8000);



