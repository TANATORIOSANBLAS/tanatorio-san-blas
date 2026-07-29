/* ==========================================
   TANATORIO SAN BLAS
   GALERÍA DE TRANSICIONES
========================================== */

const flores = [

    {
        imagen: "imagenes/transiciones/flores1.png",
        color: "negro"
    },
    {
        imagen: "imagenes/transiciones/flores2.png",
        color: "negro"
    },
    {
        imagen: "imagenes/transiciones/flores3.png",
        color: "negro"
    },
    {
        imagen: "imagenes/transiciones/flores4.png",
        color: "negro"
    }

];

const pueblos = [

    {
        imagen: "imagenes/transiciones/pueblo1.png",
        color: "negro"
    },
    {
        imagen: "imagenes/transiciones/pueblo2.png",
        color: "negro"
    },
    {
        imagen: "imagenes/transiciones/pueblo3.png",
        color: "blanco"
    },
    {
        imagen: "imagenes/transiciones/pueblo4.png",
        color: "negro"
    }

];

const iglesias = [

    {
        imagen: "imagenes/transiciones/iglesia1.png",
        color: "blanco"
    },
    {
        imagen: "imagenes/transiciones/iglesia2.png",
        color: "negro"
    },
    {
        imagen: "imagenes/transiciones/iglesia3.png",
        color: "negro"
    },
    {
        imagen: "imagenes/transiciones/iglesia4.png",
        color: "negro"
    },
    {
        imagen: "imagenes/transiciones/iglesia5.png",
        color: "blanco"
    },
    {
        imagen: "imagenes/transiciones/iglesia6.png",
        color: "negro"
    }

];

const santos = [

    {
        imagen: "imagenes/transiciones/santo1.png",
        color: "blanco"
    },
    {
        imagen: "imagenes/transiciones/santo2.png",
        color: "blanco"
    },
    {
        imagen: "imagenes/transiciones/santo3.png",
        color: "blanco"
    },
    {
        imagen: "imagenes/transiciones/santo4.png",
        color: "negro"
    }

];

function imagenAleatoria(grupo){

    return grupo[Math.floor(Math.random() * grupo.length)];

}

const gruposTransicion = [

    flores,
    pueblos,
    iglesias,
    santos

];