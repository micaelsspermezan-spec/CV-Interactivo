/* ==========================================
   CV - MICAEL SAMUEL
   NAVEGACIÓN ENTRE ZONAS Y PERSPECTIVAS
   ========================================== */


/* ==========================================
   1. CONFIGURACIÓN DE LAS ZONAS
   ========================================== */

const zonasNavegacion = {
    cabana: {
        nombre: "Cabaña",
        perspectivas: [
            { id: "vista-pared-1", nombre: "Pared frontal" },
            { id: "vista-pared-4", nombre: "Pared derecha" },
            { id: "vista-pared-3", nombre: "Pared trasera" },
            { id: "vista-pared-2", nombre: "Pared izquierda" }
        ]
    },

    exterior: {
        nombre: "Exterior",
        perspectivas: [
            { id: "vista-exterior-frente", nombre: "Frente · Mansión" },
            { id: "vista-exterior-derecha", nombre: "Bosque derecho" },
            { id: "vista-exterior-detras", nombre: "Detrás · Cabañita" },
            { id: "vista-exterior-izquierda", nombre: "Bosque izquierdo" }
        ]
    },
    mansion: {
        nombre: "Mansión",
        perspectivas: [
            { id: "vista-mansion-recibidor", nombre: "Recibidor" },
            { id: "vista-mansion-derecha", nombre: "Bosque derecho" },
            { id: "vista-mansion-detras", nombre: "Detrás" },
            { id: "vista-mansion-izquierda", nombre: "Bosque izquierdo" }
        ]
    }
};

let zonaActual = "cabana";
let perspectivaActual = 0;


/* ==========================================
   2. MOSTRAR UNA PERSPECTIVA
   ========================================== */

function mostrarPerspectiva(indice) {

    // Los mensajes y selecciones pertenecen a la perspectiva que se está abandonando.
    const mensaje = document.getElementById("mensaje-escena");
    if (mensaje) mensaje.textContent = "";

    if (typeof cancelarSeleccionCaballo === "function") {
        cancelarSeleccionCaballo();
    }

    const zona = zonasNavegacion[zonaActual];

    // El recorrido de cada zona es circular e independiente.
    perspectivaActual =
        (indice + zona.perspectivas.length) % zona.perspectivas.length;

    Object.entries(zonasNavegacion).forEach(([nombreZona, datosZona]) => {

        datosZona.perspectivas.forEach((perspectiva, posicion) => {

            const vista = document.getElementById(perspectiva.id);

            if (!vista) return;

            const debeMostrarse =
                nombreZona === zonaActual && posicion === perspectivaActual;

            vista.classList.toggle("oculta", !debeMostrarse);
        });
    });

    document.getElementById("indicador-perspectiva").textContent =
        zona.perspectivas[perspectivaActual].nombre;
}


/* ==========================================
   3. CAMBIAR DE ZONA
   ========================================== */

function cambiarZona(nombreZona, indiceInicial = 0) {

    if (!zonasNavegacion[nombreZona]) return;

    zonaActual = nombreZona;

    document.getElementById("nombre-zona").textContent =
        zonasNavegacion[zonaActual].nombre;

    mostrarPerspectiva(indiceInicial);
}


/* ==========================================
   4. INICIALIZAR LOS CONTROLES
   ========================================== */

function inicializarNavegacion() {

    const botonAnterior = document.getElementById("perspectiva-anterior");
    const botonSiguiente = document.getElementById("perspectiva-siguiente");
    const puertaSalida = document.getElementById("puerta-salida-cabana");
    const puertaRegreso = document.getElementById("puerta-regreso-cabana");
    const puertaEntradaMansion = document.getElementById("puerta-entrada-mansion");
    const salidaMansion = document.getElementById("salir-mansion-exterior");

    // Evitar registrar los mismos eventos más de una vez.
    if (botonAnterior.dataset.navegacionLista === "true") return;

    botonAnterior.dataset.navegacionLista = "true";
    botonSiguiente.dataset.navegacionLista = "true";

    botonAnterior.addEventListener("click", () => {
        mostrarPerspectiva(perspectivaActual - 1);
    });

    botonSiguiente.addEventListener("click", () => {
        mostrarPerspectiva(perspectivaActual + 1);
    });

    // Salir de la cabañita y aparecer frente a la casa grande.
    puertaSalida.addEventListener("click", () => {
        cambiarZona("exterior", 0);
    });

    // Volver a la cabañita mirando su puerta trasera.
    puertaRegreso.addEventListener("click", () => {
        cambiarZona("cabana", 0);
    });
    puertaEntradaMansion.addEventListener("click", () => cambiarZona("mansion", 0));
    salidaMansion.addEventListener("click", () => cambiarZona("exterior", 2));

    cambiarZona("cabana", 0);
}
