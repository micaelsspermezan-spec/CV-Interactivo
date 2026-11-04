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

    // Abrir el cajón y agotar la llave utilizada.
    cajonLatonAbierto = true;
    marcarObjetoAgotado("llave-laton");
    desequiparObjeto();

    mensaje.textContent =
        "¡CLAC! La llave gira y el cajón se abre. Hay algo dentro.";

    botonCajon.textContent =
        "🗄️ Cajón de latón abierto";

    // Mostrar la recompensa en la escena.
    document.getElementById("pieza-cv-1-3")
        .classList.remove("oculta");
}


/* ========================================
   2. PUZLE DE LOS CABALLOS
   ======================================== */

// Cada slot contiene el ID de un objeto de escenario o null si está vacío.
const posicionesCaballos = {
    izquierdo: "caballo-dorado",
    derecho: null
};

let slotCaballoSeleccionado = null;
let buzonAbierto = false;
let puzleCaballosResuelto = false;


function cancelarSeleccionCaballo() {

    if (slotCaballoSeleccionado === null) return;

    slotCaballoSeleccionado = null;
    actualizarSlotsCaballos();
}


function actualizarSlotsCaballos() {

    const slots = {
        izquierdo: document.getElementById("slot-caballo-izquierdo"),
        derecho: document.getElementById("slot-caballo-derecho")
    };

    Object.entries(slots).forEach(([posicion, elemento]) => {

        const objeto = posicionesCaballos[posicion];

        elemento.innerHTML = "";
        elemento.classList.toggle(
            "seleccionado",
            slotCaballoSeleccionado === posicion
        );

        if (!objeto) {
            elemento.setAttribute("aria-label", "Posición vacía");
            return;
        }

        const caballo = document.createElement("span");
        caballo.classList.add("icono-caballo");

        if (objeto === "caballo-dorado") {
            caballo.textContent = "♞";
            caballo.classList.add("caballo-dorado");
            elemento.setAttribute("aria-label", "Caballito dorado");
        } else {
            caballo.textContent = "♞";
            caballo.classList.add("caballo-plateado");
            elemento.setAttribute("aria-label", "Caballito plateado");
        }

        elemento.appendChild(caballo);
    });
}


function comprobarPuzleCaballos() {

    if (
        puzleCaballosResuelto ||
        posicionesCaballos.izquierdo !== "caballo-dorado" ||
        posicionesCaballos.derecho !== "caballo-plateado"
    ) {
        return;
    }

    puzleCaballosResuelto = true;

    document.getElementById("pieza-cv-2-3")
        .classList.remove("oculta");

    document.getElementById("mensaje-escena").textContent =
        "Los dos caballitos se miran frente a frente. Has encontrado la Pieza 2 del currículum.";
}


function interactuarConSlotCaballo(posicion) {

    const objetoEnSlot = posicionesCaballos[posicion];
    const mensaje = document.getElementById("mensaje-escena");

    // Si ya hay un objeto de escenario seleccionado, moverlo o intercambiarlo.
    if (slotCaballoSeleccionado !== null) {

        if (slotCaballoSeleccionado === posicion) {
            cancelarSeleccionCaballo();
            mensaje.textContent = "";
            return;
        }

        const origen = slotCaballoSeleccionado;

        const objetoOrigen = posicionesCaballos[origen];
        posicionesCaballos[origen] = objetoEnSlot;
        posicionesCaballos[posicion] = objetoOrigen;

        slotCaballoSeleccionado = null;
        actualizarSlotsCaballos();
        comprobarPuzleCaballos();
        return;
    }

    // Pulsar un objeto de escenario lo selecciona; no lo recoge.
    if (objetoEnSlot !== null) {

        slotCaballoSeleccionado = posicion;
        actualizarSlotsCaballos();

        if (objetoEnSlot === "caballo-dorado") {
            mensaje.textContent = "Un caballito dorado.";
        } else {
            mensaje.textContent = "Un caballito plateado.";
        }

        return;
    }

    // Un slot vacío acepta el objeto plateado si está equipado.
    const equipado = obtenerObjetoEquipado();

    if (equipado && equipado.id === "caballo-plateado") {

        const caballoRetirado = retirarObjetoInventario("caballo-plateado");

        if (!caballoRetirado) return;

        posicionesCaballos[posicion] = "caballo-plateado";

        actualizarSlotsCaballos();
        comprobarPuzleCaballos();

        if (!puzleCaballosResuelto) {
            mensaje.textContent = "Has colocado el caballito plateado en la pared.";
        }
    }
}


function abrirBuzonOxidado() {

    const mensaje = document.getElementById("mensaje-escena");
    const botonBuzon = document.getElementById("buzon-oxidado");

    if (buzonAbierto) {
        mensaje.textContent = "El buzón ya está abierto.";
        return;
    }

    const equipado = obtenerObjetoEquipado();

    if (!equipado || equipado.id !== "llave-hierro") {
        mensaje.textContent = "El buzón está cerrado. Necesitas la llave de hierro equipada.";
        return;
    }

    buzonAbierto = true;
    botonBuzon.classList.add("buzon-abierto");
    botonBuzon.setAttribute("aria-label", "Buzón abierto");

    // La llave se agota al abrir el buzón; el caballo queda en la escena.
    marcarObjetoAgotado("llave-hierro");
    desequiparObjeto();

    document.getElementById("caballo-plateado-suelto")
        .classList.remove("oculta");

    mensaje.textContent =
        "La llave de hierro abre el buzón. Un caballito plateado ha caído al suelo.";
}


// Cualquier clic de la escena que no sea sobre un slot cancela la selección.
const escenaCaballos = document.getElementById("escena");
escenaCaballos.addEventListener("click", (evento) => {
    if (evento.target.closest(".slot-caballo")) return;
    cancelarSeleccionCaballo();
});


// Registrar las interacciones de la pared y del buzón.
document.getElementById("slot-caballo-izquierdo")
    .addEventListener("click", () => interactuarConSlotCaballo("izquierdo"));

document.getElementById("slot-caballo-derecho")
    .addEventListener("click", () => interactuarConSlotCaballo("derecho"));

document.getElementById("buzon-oxidado")
    .addEventListener("click", abrirBuzonOxidado);


// El caballo plateado se recoge con un clic independiente tras abrir el buzón.
document.getElementById("caballo-plateado-suelto")
    .addEventListener("click", () => {

        const caballo = añadirObjeto(
            "caballo-plateado",
            "♞ Caballito plateado",
            "Objeto de mecanismo",
            "Un pequeño caballito plateado.",
            "herramienta"
        );

        if (!caballo) return;

        document.getElementById("caballo-plateado-suelto")
            .classList.add("oculta");

        document.getElementById("mensaje-escena").textContent =
            "Has recogido el caballito plateado.";
    });

actualizarSlotsCaballos();
