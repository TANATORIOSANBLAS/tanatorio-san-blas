/* ==========================================
   TANATORIO SAN BLAS - MOTOR DE PANTALLA
========================================== */

import { db } from "./firebase.js";

import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


//======================================
// VARIABLES
//======================================

let servicios = [];

let servicioActual = 0;
let fotoActual = 0;
let escena = 0;


//======================================
// SECUENCIA DE PANTALLAS
//======================================

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


//======================================
// MOSTRAR SERVICIO
//======================================

function mostrarServicio() {

    const servicio = servicios[servicioActual];

    if (!servicio) return;


    document.body.classList.add("fade-out");


    setTimeout(() => {

        // Comprobamos otra vez por seguridad
        const servicioActualizado = servicios[servicioActual];

        if (!servicioActualizado) return;


        // Ocultar transición
        ocultarTransicion();


        // DATOS
        document.getElementById("nombre").textContent =
            servicioActualizado.nombre || "";

        document.getElementById("parroquia").textContent =
            servicioActualizado.parroquia || "";

        document.getElementById("misa").textContent =
            servicioActualizado.misa || "";

        document.getElementById("sala").textContent =
            servicioActualizado.sala || "";


        // FOTOGRAFÍA
        const visor = document.getElementById("visor");

        if (
            servicioActualizado.fotos &&
            servicioActualizado.fotos.length > 0
        ) {

            if (
                fotoActual >=
                servicioActualizado.fotos.length
            ) {

                fotoActual = 0;

            }

            visor.src =
                servicioActualizado.fotos[fotoActual];

        } else {

            visor.removeAttribute("src");

        }


        // FONDO
        document.body.style.backgroundImage =
            `url('${servicioActualizado.fondo}')`;


        // COLORES
        document.body.classList.remove("texto-blanco");
        document.body.classList.remove("texto-negro");


        if (
            servicioActualizado.colorTexto === "blanco"
        ) {

            document.body.classList.add("texto-blanco");

            document.getElementById("logo").src =
                "imagenes/logos/logob.png";

        } else {

            document.body.classList.add("texto-negro");

            document.getElementById("logo").src =
                "imagenes/logos/logon.png";

        }


        document.body.classList.remove("fade-out");
        document.body.classList.add("fade-in");

    }, 400);

}


//======================================
// OCULTAR TRANSICIÓN
//======================================

function ocultarTransicion() {

    document.getElementById(
        "pantallaTransicion"
    ).style.display = "none";

}


//======================================
// IMAGEN ALEATORIA
//======================================

function imagenAleatoria(grupo) {

    return grupo[
        Math.floor(
            Math.random() * grupo.length
        )
    ];

}


//======================================
// MOSTRAR CATEGORÍA
//======================================

function mostrarCategoria(grupo) {

    if (!grupo || grupo.length === 0) return;


    const transicion =
        imagenAleatoria(grupo);


    document.getElementById(
        "imagenTransicion"
    ).src = transicion.imagen;


    if (transicion.color === "blanco") {

        document.getElementById("logo").src =
            "imagenes/logos/logob.png";

    } else {

        document.getElementById("logo").src =
            "imagenes/logos/logon.png";

    }


    document.getElementById(
        "pantallaTransicion"
    ).style.display = "flex";

}


//======================================
// SIGUIENTE SERVICIO
//======================================

function siguienteServicio() {

    if (servicios.length === 0) return;


    // Si solo hay una sala activa,
    // seguimos siempre en ella
    if (servicios.length === 1) {

        servicioActual = 0;

    } else {

        // Si hay dos salas activas,
        // pasamos a la siguiente
        servicioActual++;


        if (
            servicioActual >= servicios.length
        ) {

            servicioActual = 0;

        }

    }


    fotoActual = 0;


    // Empezamos la nueva sala
    // desde la primera escena
    escena = 0;

    mostrarServicio();

}


//======================================
// SIGUIENTE ESCENA
//======================================

function siguienteEscena() {

    if (servicios.length === 0) return;


    escena++;


    // Hemos terminado el ciclo completo
    // de la sala actual
    if (escena >= secuencia.length) {

        siguienteServicio();

        return;

    }


    const elemento = secuencia[escena];


    // null = pantalla de información
    if (elemento === null) {

        mostrarServicio();

    } else {

        mostrarCategoria(elemento);

    }

}


//======================================
// RELOJ
//======================================

function actualizarReloj() {

    const ahora = new Date();

    const horas =
        ahora.getHours()
            .toString()
            .padStart(2, "0");

    const minutos =
        ahora.getMinutes()
            .toString()
            .padStart(2, "0");


    document.getElementById("reloj").textContent =
        horas + ":" + minutos;

}


//======================================
// FIREBASE - ESCUCHAR SALAS
//======================================

onSnapshot(
    collection(db, "salas"),
    (snapshot) => {

        const nuevosServicios = [];


        snapshot.forEach((documento) => {

            const servicio =
                documento.data();


            // Solo mostramos servicios activos
            if (servicio.activo === true) {

                nuevosServicios.push({

                    ...servicio,

                    sala:
                        documento.id === "sala1"
                            ? "Sala 1"
                            : "Sala 2"

                });

            }

        });


        // Orden fijo: Sala 1 y Sala 2
        nuevosServicios.sort((a, b) => {

            return a.sala.localeCompare(
                b.sala
            );

        });


        // Guardamos los servicios
        servicios = nuevosServicios;


        // Si no hay servicios
        if (servicios.length === 0) {

            ocultarTransicion();

            return;

        }


        // Evitar una posición inválida
        if (
            servicioActual >= servicios.length
        ) {

            servicioActual = 0;

        }


        // Si cambiaron los datos en Firebase,
        // mostramos el servicio actual,
        // pero NO reiniciamos constantemente
        if (fotoActual >=
            (servicios[servicioActual].fotos?.length || 1)
        ) {

            fotoActual = 0;

        }


        mostrarServicio();

    }

);


//======================================
// INICIO
//======================================

actualizarReloj();

setInterval(
    actualizarReloj,
    1000
);


//======================================
// MOTOR DE PANTALLAS
//======================================

setInterval(() => {

    siguienteEscena();

}, 8000);