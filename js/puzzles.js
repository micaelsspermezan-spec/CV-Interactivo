/* ==========================================
   SISTEMA DE PUZLES Y MECANISMOS
   ========================================== */


/* ========================================
   1. CAJÓN CON CERRADURA DE LATÓN
   ======================================== */

let cajonLatonAbierto = false;

function interactuarConCajon() {

    const mensaje = document.getElementById("mensaje-escena");
    const botonCajon = document.getElementById("cajon-laton");

    if (cajonLatonAbierto) {
        mensaje.textContent =
            "El cajón ya está abierto. Parece que está vacío.";

        return;
    }

    const objeto = obtenerObjetoEquipado();

    if (!objeto) {
        mensaje.textContent =
            "El cajón está cerrado. Necesitas una llave.";

        return;
    }

    if (objeto.tipo !== "llave") {
        mensaje.textContent =
            "Ese objeto no sirve para abrir esta cerradura.";

        return;
    }

    if (objeto.id !== "llave-laton") {
        mensaje.textContent =
            "La llave no encaja. Necesitas una llave de latón.";

        return;
    }

    // Abrir el cajón.
    cajonLatonAbierto = true;

    mensaje.textContent =
        "¡CLAC! La llave gira y el cajón se abre. Hay algo dentro.";

    botonCajon.textContent =
        "🗄️ Cajón de latón abierto";

    // Mostrar la recompensa en la escena.
    document.getElementById("pieza-cv-1-3")
        .classList.remove("oculta");
}