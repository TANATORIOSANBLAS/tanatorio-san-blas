import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


/* ==========================================
   PANEL DE ADMINISTRACIÓN
   TANATORIO SAN BLAS
========================================== */

let salaActual = 0;

// Fotos que ya están guardadas en Firebase
let fotosGuardadas = [];


//======================================
// BOTONES DE SALA
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

function seleccionarSala(numero) {

    salaActual = numero;

    cargarFormulario();

}


//======================================
// CARGAR FORMULARIO
//======================================

async function cargarFormulario() {

    try {

        const numeroSala = salaActual + 1;

        const referencia = doc(db, "salas", "sala" + numeroSala);

        const resultado = await getDoc(referencia);


        // Si existe el documento en Firebase
        if (resultado.exists()) {

            const servicio = resultado.data();


            document.getElementById("nombre").value =
                servicio.nombre || "";

            document.getElementById("parroquia").value =
                servicio.parroquia || "";

            document.getElementById("misa").value =
                servicio.misa || "";

            document.getElementById("fondo").value =
                servicio.fondo || "imagenes/fondos/fondo_az.png";

            document.getElementById("colorTexto").value =
                servicio.colorTexto || "blanco";

            document.getElementById("activo").checked =
                servicio.activo !== false;


            // Recuperar fotos guardadas
            fotosGuardadas = Array.isArray(servicio.fotos)
                ? servicio.fotos
                : [];


            console.log(
                "Sala " + numeroSala +
                " cargada desde Firebase."
            );

            console.log(
                "Fotos guardadas:",
                fotosGuardadas.length
            );


        } else {

            // Si todavía no existe el documento
            console.log(
                "La sala " + numeroSala +
                " todavía no existe en Firebase."
            );

            fotosGuardadas = [];

            cargarDatosIniciales();

        }


    } catch (error) {

        console.error(
            "Error cargando la sala:",
            error
        );

        alert(
            "No se pudieron cargar los datos de la sala."
        );

    }

}


//======================================
// DATOS INICIALES
//======================================

function cargarDatosIniciales() {

    // Solo se utiliza si todavía no existe
    // la sala en Firebase.

    if (
        typeof servicios === "undefined" ||
        !servicios[salaActual]
    ) {

        document.getElementById("nombre").value = "";
        document.getElementById("parroquia").value = "";
        document.getElementById("misa").value = "";

        return;

    }


    const servicio = servicios[salaActual];


    document.getElementById("nombre").value =
        servicio.nombre || "";

    document.getElementById("parroquia").value =
        servicio.parroquia || "";

    document.getElementById("misa").value =
        servicio.misa || "";

    document.getElementById("fondo").value =
        servicio.fondo ||
        "imagenes/fondos/fondo_az.png";

    document.getElementById("colorTexto").value =
        servicio.colorTexto || "blanco";

    document.getElementById("activo").checked =
        servicio.activo !== false;

}


//======================================
// CONVERTIR Y REDUCIR FOTO
//======================================

function convertirFoto(file) {

    return new Promise((resolve, reject) => {

        const lector = new FileReader();


        lector.onload = function(evento) {

            const imagen = new Image();


            imagen.onload = function() {

                const MAX_ANCHO = 800;
                const MAX_ALTO = 800;


                let ancho = imagen.width;
                let alto = imagen.height;


                // Reducir manteniendo proporciones
                if (ancho > MAX_ANCHO) {

                    alto =
                        alto * (MAX_ANCHO / ancho);

                    ancho = MAX_ANCHO;

                }


                if (alto > MAX_ALTO) {

                    ancho =
                        ancho * (MAX_ALTO / alto);

                    alto = MAX_ALTO;

                }


                const canvas =
                    document.createElement("canvas");


                canvas.width = Math.round(ancho);
                canvas.height = Math.round(alto);


                const contexto =
                    canvas.getContext("2d");


                contexto.drawImage(
                    imagen,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );


                // Convertimos a JPEG comprimido
                const fotoReducida =
                    canvas.toDataURL(
                        "image/jpeg",
                        0.65
                    );


                resolve(fotoReducida);

            };


            imagen.onerror = function() {

                reject(
                    new Error(
                        "No se pudo cargar la imagen."
                    )
                );

            };


            imagen.src = evento.target.result;

        };


        lector.onerror = function() {

            reject(
                new Error(
                    "No se pudo leer el archivo."
                )
            );

        };


        lector.readAsDataURL(file);

    });

}


//======================================
// PROCESAR FOTOS SELECCIONADAS
//======================================

async function procesarFotos() {

    const selector =
        document.getElementById("fotos");


    // Si no se ha seleccionado ninguna foto,
    // conservamos las que ya había.
    if (
        !selector.files ||
        selector.files.length === 0
    ) {

        return fotosGuardadas;

    }


    const nuevasFotos = [];


    for (
        const archivo of selector.files
    ) {

        // Comprobar que sea una imagen
        if (
            !archivo.type.startsWith("image/")
        ) {

            continue;

        }


        try {

            const foto =
                await convertirFoto(archivo);


            nuevasFotos.push(foto);


        } catch (error) {

            console.error(
                "Error procesando foto:",
                error
            );

        }

    }


    return nuevasFotos;

}


//======================================
// GUARDAR
//======================================

document
    .getElementById("guardar")
    .addEventListener(
        "click",
        guardarServicio
    );


//======================================
// GUARDAR SERVICIO
//======================================

async function guardarServicio() {

    const boton =
        document.getElementById("guardar");


    try {

        // Desactivar botón mientras guardamos
        boton.disabled = true;

        boton.textContent =
            "Guardando...";


        // Procesar fotos
        const fotos =
            await procesarFotos();


        const numeroSala =
            salaActual + 1;


        const servicio = {

            nombre:
                document
                    .getElementById("nombre")
                    .value
                    .trim(),

            parroquia:
                document
                    .getElementById("parroquia")
                    .value
                    .trim(),

            misa:
                document
                    .getElementById("misa")
                    .value
                    .trim(),

            fondo:
                document
                    .getElementById("fondo")
                    .value,

            colorTexto:
                document
                    .getElementById("colorTexto")
                    .value,

            activo:
                document
                    .getElementById("activo")
                    .checked,

            sala:
                "Sala " + numeroSala,

            fotos:
                fotos

        };


        console.log(
            "Guardando servicio:",
            servicio
        );


        // Guardar en Firebase
        await setDoc(
            doc(
                db,
                "salas",
                "sala" + numeroSala
            ),
            servicio
        );


        // Actualizar memoria local
        fotosGuardadas = fotos;


        alert(
            "Servicio guardado correctamente."
        );


        console.log(
            "Servicio guardado correctamente."
        );


    } catch (error) {

        console.error(
            "ERROR AL GUARDAR:",
            error
        );


        alert(
            "No se pudo guardar el servicio.\n\n" +
            error.message
        );


    } finally {

        // Volver a activar botón
        boton.disabled = false;

        boton.textContent =
            "Guardar cambios";

    }

}


//======================================
// INICIO
//======================================

seleccionarSala(0);