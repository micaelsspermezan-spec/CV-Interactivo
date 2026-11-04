/* ==========================================
   CV - MICAEL SAMUEL
   COORDINACIÓN GENERAL DE LA INTERFAZ
   ========================================== */


/* ==========================================
   1. REFERENCIAS HTML
   ========================================== */

const inicio = document.getElementById("inicio");
const exploracion = document.getElementById("exploracion");

const botonEntrar = document.getElementById("entrar");
const botonVerCV = document.getElementById("ver-cv");
const botonVolverMenu = document.getElementById("volver-menu");

const panelCV = document.getElementById("panel-cv");
const inventario = document.getElementById("inventario");

const mensajeEscena = document.getElementById("mensaje-escena");


/* ==========================================
   2. NAVEGACIÓN
   ========================================== */

// Entrar en la cabaña.
botonEntrar.addEventListener("click", () => {

    inicio.classList.add("oculta");
    exploracion.classList.remove("oculta");

    volverVistaPrincipal();
});


// Volver al menú principal.
botonVolverMenu.addEventListener("click", () => {

    panelCV.classList.add("oculta");
    inventario.classList.add("oculta");
    plegarGrupoPiezasCV();

    document.getElementById("menu-equipamiento")
        .classList.add("oculta");

    // Limpiar mensajes temporales.
    mensajeEscena.textContent = "";

    // Deseleccionar el objeto del inventario.
    deseleccionarObjeto();

    exploracion.classList.add("oculta");
    inicio.classList.remove("oculta");
});


function volverVistaPrincipal() {
    // Al entrar en la exploración, comenzar en la pared frontal de la cabaña.
    inicializarNavegacion();
    cambiarZona("cabana", 0);
}


/* ==========================================
   3. PANEL DEL CURRÍCULUM
   ========================================== */

botonVerCV.addEventListener("click", () => {

    panelCV.classList.remove("oculta");
});


document.getElementById("cerrar-cv").addEventListener("click", evento => {

    evento.stopPropagation();

    panelCV.classList.add("oculta");
});


/* ==========================================
   4. INVENTARIO
   ========================================== */

document.getElementById("abrir-inventario").addEventListener("click", () => {

    document.getElementById("menu-equipamiento")
        .classList.add("oculta");

    deseleccionarObjeto();

    inventario.classList.remove("oculta");
});


document.getElementById("cerrar-inventario").addEventListener("click", () => {

    plegarGrupoPiezasCV();
    deseleccionarObjeto();

    inventario.classList.add("oculta");
});


/* ==========================================
   5. PÓSTER DEL CURRÍCULUM
   ========================================== */

document.getElementById("poster-cv").addEventListener("click", () => {

    añadirObjeto(
        "curriculum",
        "📜 Currículum",
        "Documento",
        "Documento que contendría mi formación y experiencia.",
        "documento"
    );

    document.getElementById("poster-cv")
        .classList.add("oculta");

    botonVerCV.classList.remove("oculta");

    mensajeEscena.textContent =
        "Has encontrado un curriculum vacío.";
});


/* ==========================================
   6. LLAVE DE HIERRO
   ========================================== */

document.getElementById("llave-hierro").addEventListener("click", () => {

    añadirObjeto(
        "llave-hierro",
        "🗝️ Llave de hierro",
        "Llave",
        "Llave vieja y desgastada. Mayormente roída por el óxido.",
        "llave"
    );

    document.getElementById("llave-hierro")
        .classList.add("oculta");

    if (obtenerObjetoEquipado()?.id !== "llave-hierro") {
        mensajeEscena.textContent = "Has encontrado una llave de hierro.";
    }
});


/* ==========================================
   7. LLAVE DE LATÓN
   ========================================== */

document.getElementById("llave-laton").addEventListener("click", () => {

    añadirObjeto(
        "llave-laton",
        "🗝️ Llave de latón",
        "Llave",
        "Pequeña llave de latón. Ha sido cuidada con mucho mimo.",
        "llave"
    );

    document.getElementById("llave-laton")
        .classList.add("oculta");

    if (obtenerObjetoEquipado()?.id !== "llave-laton") {
        mensajeEscena.textContent = "Has encontrado una llave de latón.";
    }
});


/* ==========================================
   8. CAJÓN CON CERRADURA DE LATÓN
   ========================================== */

document.getElementById("cajon-laton").addEventListener("click", () => {

    interactuarConCajon();
});


/* ==========================================
   9. PIEZA DE CURRÍCULUM
   ========================================== */

document.getElementById("pieza-cv-1-3").addEventListener("click", () => {

    añadirObjeto(
        "pieza-cv-1-3",
        "📄 Pieza de CV 1/3",
        "Fragmento de currículum",
        "Información sobre mi perfil y formación.",
        "pieza-cv"
    );

    document.getElementById("pieza-cv-1-3")
        .classList.add("oculta");

    // Revelar el fragmento correspondiente dentro del currículum.
    desbloquearPiezaCV(1);

    mensajeEscena.textContent =
        "Has recuperado la primera pieza del currículum.";
});


// Recoger la segunda pieza: experiencia laboral e idiomas.
document.getElementById("pieza-cv-2-3").addEventListener("click", () => {

    añadirObjeto(
        "pieza-cv-2-3",
        "📄 Pieza de CV 2/3",
        "Fragmento de currículum",
        "Información sobre mi experiencia laboral y mis competencias de idiomas.",
        "pieza-cv"
    );

    document.getElementById("pieza-cv-2-3")
        .classList.add("oculta");

    desbloquearPiezaCV(2);

    mensajeEscena.textContent =
        "Has recuperado la segunda pieza del currículum.";
});


// Recoger la tercera pieza: competencias digitales e intereses.
document.getElementById("pieza-cv-3-3").addEventListener("click", () => {

    añadirObjeto(
        "pieza-cv-3-3",
        "📄 Pieza de CV 3/3",
        "Fragmento de currículum",
        "Información sobre mis competencias digitales y mis aficiones e intereses.",
        "pieza-cv"
    );

    document.getElementById("pieza-cv-3-3")
        .classList.add("oculta");

    desbloquearPiezaCV(3);

    mensajeEscena.textContent =
        "Has recuperado la tercera pieza del currículum.";
});


/* ==========================================
   10. DESBLOQUEO DE FRAGMENTOS DEL CV
   ========================================== */

function desbloquearPiezaCV(numeroPieza) {

    const fragmento = document.querySelector(
        `[data-pieza-cv="${numeroPieza}"]`
    );

    if (!fragmento) return;

    fragmento.classList.add("revelado");
}


/* ==========================================
   11. DETECCIÓN DE CLICS EXTERIORES
   ========================================== */

document.addEventListener("click", evento => {

    const elemento = evento.target;

    const menuEquipamiento =
        document.getElementById("menu-equipamiento");

    // Cerrar menú de equipamiento al pulsar fuera.
    if (
        !menuEquipamiento.classList.contains("oculta") &&
        !elemento.closest("#contenedor-equipamiento")
    ) {
        menuEquipamiento.classList.add("oculta");
    }


    // Cerrar inventario al pulsar fuera.
    // Se comprueba también la ruta original del evento por si el clic
    // ha reconstruido la lista durante su propio procesamiento.
    const rutaEvento = evento.composedPath();
    const clicDentroInventario = rutaEvento.includes(inventario);
    const clicEnControlInventario = elemento.closest(
        "#abrir-inventario, #contenedor-equipamiento, #acciones-objeto"
    );

    if (
        !inventario.classList.contains("oculta") &&
        !clicDentroInventario &&
        !panelCV.contains(elemento) &&
        !clicEnControlInventario
    ) {
        inventario.classList.add("oculta");
        plegarGrupoPiezasCV();
        deseleccionarObjeto();
    }


    // Cerrar CV al pulsar fuera.
    if (
        !panelCV.classList.contains("oculta") &&
        !panelCV.contains(elemento) &&
        !elemento.closest("#ver-cv, #acciones-objeto")
    ) {
        panelCV.classList.add("oculta");
    }
});