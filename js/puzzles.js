/* ==========================================
   SISTEMA DE PUZLES Y MECANISMOS
   ========================================== */


/* ========================================
   1. COFRE DEL ESCRITORIO
   ======================================== */

let cofreEscritorioAbierto = false;

function interactuarConCofre() {
    const mensaje = document.getElementById("mensaje-escena");
    const botonCofre = document.getElementById("cofre-escritorio");

    if (cofreEscritorioAbierto) {
        mensaje.textContent = "El cofre ya está abierto.";
        return;
    }

    const objeto = obtenerObjetoEquipado();

    if (!objeto) {
        mensaje.textContent = "El cofre está cerrado. Necesitas una llave de cobre.";
        return;
    }
    if (objeto.id !== "llave-cobre") {
        mensaje.textContent = "Esa llave no sirve para este cofre.";
        return;
    }

    cofreEscritorioAbierto = true;
    marcarObjetoAgotado("llave-cobre");
    desequiparObjeto();
    mensaje.textContent = "¡CLAC! La llave de cobre gira y el cofre se abre. Dentro hay algo.";
    botonCofre.textContent = "Cofre abierto";
    document.getElementById("pieza-cv-1-3").classList.remove("oculta");
}


/* ========================================
   2. PUZLE DEL CUERVO — PIEZA 1
   ======================================== */

let cuervoAlimentado = false;
let llaveCobreEnSuelo = false;

function interactuarConCuervo() {
    const mensaje = document.getElementById("mensaje-escena");
    mensaje.textContent = cuervoAlimentado
        ? "El cuervo está ocupado comiendo."
        : "El cuervo está demasiado alto para alcanzarlo.";
}

function interactuarConCuenco() {
    const mensaje = document.getElementById("mensaje-escena");

    if (cuervoAlimentado) {
        mensaje.textContent = "El cuervo sigue comiendo junto al cuenco.";
        return;
    }

    const equipado = obtenerObjetoEquipado();
    if (!equipado || equipado.id !== "saco-pienso") {
        mensaje.textContent = "El cuenco del perro está vacío.";
        return;
    }

    cuervoAlimentado = true;
    marcarObjetoAgotado("saco-pienso");
    desequiparObjeto();
    const cuervo = document.getElementById("cuervo-mansion");
    cuervo.classList.add("cuervo-alimentado");
    cuervo.setAttribute("aria-label", "Cuervo comiendo");

    // La llave deja el nido y cae hasta el suelo, donde puede recogerse.
    document.querySelector(".llave-cobre-decorativa")?.classList.add("oculta");
    const llave = document.getElementById("llave-cobre-suelta");
    llave.classList.remove("oculta");
    requestAnimationFrame(() => llave.classList.add("llave-cayendo"));
    llaveCobreEnSuelo = true;
    mensaje.textContent = "El cuervo baja a comer. La llave de cobre cae del nido al suelo.";
}

function recogerLlaveCobre() {
    if (!llaveCobreEnSuelo) return;

    const objeto = añadirObjeto(
        "llave-cobre",
        "🗝️ Llave de cobre",
        "Llave",
        "Una llave de cobre que el cuervo guardaba en el pico.",
        "llave"
    );

    if (!objeto) return;

    llaveCobreEnSuelo = false;
    document.getElementById("llave-cobre-suelta").classList.add("oculta");
    document.getElementById("mensaje-escena").textContent = "Has recogido la llave de cobre.";
}


/* ========================================
   2. PUZLE DE LOS CABALLOS
   ======================================== */

// Cada slot contiene el ID de un objeto de escenario o null si está vacío.
const posicionesCaballos = {
    izquierdo: null,
    derecho: "caballo-dorado"
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


/* ========================================
   3. PUZLE DE LOS TROFEOS — PIEZA 3
   ======================================== */

// Los cráneos que ya están en la pared se mueven como los caballitos.
// Los slots se detectan en el HTML para poder ampliar el mecanismo más adelante.
const slotsTrofeos = [...document.querySelectorAll(".slot-trofeo")];
const ordenTrofeosCorrecto = ["craneo-cabra", "craneo-ciervo", "craneo-alce"];
const posicionesTrofeos = Object.fromEntries(
    slotsTrofeos.map((elemento, indice) => [
        elemento.dataset.posicion,
        indice === 0 ? "craneo-ciervo" : null
    ])
);

let slotTrofeoSeleccionado = null;
let puzleTrofeosResuelto = false;


function cancelarSeleccionTrofeo() {
    if (slotTrofeoSeleccionado === null) return;

    slotTrofeoSeleccionado = null;
    actualizarSlotsTrofeos();
}


function actualizarSlotsTrofeos() {
    slotsTrofeos.forEach(elemento => {
        const posicion = elemento.dataset.posicion;
        const objeto = posicionesTrofeos[posicion];

        elemento.innerHTML = "";
        elemento.classList.toggle(
            "seleccionado",
            slotTrofeoSeleccionado === posicion
        );

        if (!objeto) {
            elemento.setAttribute("aria-label", "Posición vacía");
            return;
        }

        const craneo = document.createElement("span");
        craneo.classList.add("icono-craneo", objeto);
        craneo.innerHTML = "<span class=\"craneo-asta craneo-asta-izq\"></span><span class=\"craneo-asta craneo-asta-der\"></span><span class=\"craneo-hueso\"></span><span class=\"craneo-ojo craneo-ojo-izq\"></span><span class=\"craneo-ojo craneo-ojo-der\"></span><span class=\"craneo-nariz\"></span>";
        elemento.setAttribute(
            "aria-label",
            `Cráneo de ${objeto.replace("craneo-", "")}`
        );
        elemento.appendChild(craneo);
    });
}


function comprobarPuzleTrofeos() {
    const ordenActual = slotsTrofeos
        .map(elemento => posicionesTrofeos[elemento.dataset.posicion]);

    if (
        puzleTrofeosResuelto ||
        ordenActual.length !== ordenTrofeosCorrecto.length ||
        !ordenActual.every((craneo, indice) =>
            craneo === ordenTrofeosCorrecto[indice]
        )
    ) {
        return;
    }

    puzleTrofeosResuelto = true;
    document.getElementById("pieza-cv-3-3").classList.remove("oculta");
    document.getElementById("mensaje-escena").textContent =
        "Los tres trofeos ocupan su lugar. Has encontrado la Pieza 3 del currículum.";
}


function interactuarConSlotTrofeo(posicion) {
    const objetoEnSlot = posicionesTrofeos[posicion];
    const mensaje = document.getElementById("mensaje-escena");

    if (slotTrofeoSeleccionado !== null) {
        if (slotTrofeoSeleccionado === posicion) {
            cancelarSeleccionTrofeo();
            mensaje.textContent = "";
            return;
        }

        const origen = slotTrofeoSeleccionado;
        const objetoOrigen = posicionesTrofeos[origen];

        posicionesTrofeos[origen] = objetoEnSlot;
        posicionesTrofeos[posicion] = objetoOrigen;

        slotTrofeoSeleccionado = null;
        actualizarSlotsTrofeos();
        comprobarPuzleTrofeos();
        return;
    }

    if (objetoEnSlot !== null) {
        slotTrofeoSeleccionado = posicion;
        actualizarSlotsTrofeos();
        mensaje.textContent =
            `Un cráneo de ${objetoEnSlot.replace("craneo-", "")}.`;
        return;
    }

    const equipado = obtenerObjetoEquipado();
    if (
        !equipado ||
        !["craneo-cabra", "craneo-alce"].includes(equipado.id)
    ) {
        return;
    }

    const craneoRetirado = retirarObjetoInventario(equipado.id);
    if (!craneoRetirado) return;

    posicionesTrofeos[posicion] = equipado.id;
    actualizarSlotsTrofeos();
    comprobarPuzleTrofeos();

    if (!puzleTrofeosResuelto) {
        mensaje.textContent =
            `Has colocado el cráneo de ${equipado.id.replace("craneo-", "")} en la pared.`;
    }
}


function recogerCraneoTrofeo(id, nombre, descripcion, elemento) {
    const objeto = añadirObjeto(
        id,
        nombre,
        "Trofeo",
        descripcion,
        "herramienta"
    );

    if (!objeto) return;

    elemento.classList.add("oculta");
    document.getElementById("mensaje-escena").textContent =
        `Has recogido ${nombre.toLowerCase()}.`;
}


// Recoger los dos cráneos que comienzan fuera de la pared.
document.getElementById("craneo-cabra-suelto").addEventListener("click", evento => {
    recogerCraneoTrofeo(
        "craneo-cabra",
        "💀 Cráneo de cabra",
        "Un cráneo de cabra con los cuernos cortados, recuperado de los restos atrapados en el cepo.",
        evento.currentTarget
    );
});

document.getElementById("craneo-alce-suelto").addEventListener("click", evento => {
    recogerCraneoTrofeo(
        "craneo-alce",
        "💀 Cráneo de alce",
        "Un cráneo de alce con una gran cornamenta, encontrado sobre el tejado de la cabañita.",
        evento.currentTarget
    );
});

document.querySelectorAll(".slot-trofeo").forEach(elemento => {
    elemento.addEventListener("click", () => {
        interactuarConSlotTrofeo(elemento.dataset.posicion);
    });
});


// Pulsar fuera de los slots cancela la selección, como en el puzle de caballos.
const escenaTrofeos = document.getElementById("escena");
escenaTrofeos.addEventListener("click", evento => {
    if (evento.target.closest(".slot-trofeo")) return;
    cancelarSeleccionTrofeo();
});

actualizarSlotsTrofeos();


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
