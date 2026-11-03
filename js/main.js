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
    // Reservado para futuras vistas de navegación.
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
        "Un documento que contiene mi formación y experiencia.",
        "documento"
    );

    document.getElementById("poster-cv")
        .classList.add("oculta");

    botonVerCV.classList.remove("oculta");

    mensajeEscena.textContent =
        "Has encontrado un documento misterioso.";
});


/* ==========================================
   6. LLAVE DE HIERRO
   ========================================== */

document.getElementById("llave-hierro").addEventListener("click", () => {

    añadirObjeto(
        "llave-hierro",
        "🗝️ Llave de hierro",
        "Una llave antigua y desgastada. No parece encajar en cualquier cerradura.",
        "llave"
    );

    document.getElementById("llave-hierro")
        .classList.add("oculta");

    mensajeEscena.textContent =
        "Has encontrado una llave de hierro.";
});


/* ==========================================
   7. LLAVE DE LATÓN
   ========================================== */

document.getElementById("llave-laton").addEventListener("click", () => {

    añadirObjeto(
        "llave-laton",
        "🗝️ Llave de latón",
        "Una llave de latón con un aspecto cuidado. Quizá abra alguna cerradura de la cabaña.",
        "llave"
    );

    document.getElementById("llave-laton")
        .classList.add("oculta");

    mensajeEscena.textContent =
        "Has encontrado una llave de latón.";
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
        "Primer fragmento del currículum. Contiene información sobre mi formación académica.",
        "pieza-cv"
    );

    document.getElementById("pieza-cv-1-3")
        .classList.add("oculta");

    // Revelar el fragmento correspondiente dentro del currículum.
    desbloquearPiezaCV(1);

    mensajeEscena.textContent =
        "Has recuperado la primera pieza del currículum.";
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
    if (
        !inventario.classList.contains("oculta") &&
        !inventario.contains(elemento) &&
        !panelCV.contains(elemento) &&
        !elemento.closest("#abrir-inventario, #contenedor-equipamiento, #acciones-objeto")
    ) {
        inventario.classList.add("oculta");
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