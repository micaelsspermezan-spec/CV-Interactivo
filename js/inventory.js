/* ==========================================
   INVENTARIO DEL JUGADOR
   Gestión de objetos, selección y equipamiento.
   ========================================== */


/* ==========================================
   1. DATOS DEL INVENTARIO
   ========================================== */

const objetosInventario = [];

let objetoSeleccionado = null;
let objetoEquipado = null;


/* ==========================================
   DATOS DE LOS FRAGMENTOS DEL CURRÍCULUM
   Añadir aquí los datos de cada nueva pieza.
   ========================================== */

const datosPiezasCV = {
    "pieza-cv-1-3": {
        datos: [
            "Estudiante de Sistemas Microinformáticos y Redes, con interés en la informática, la programación y el desarrollo de videojuegos. Actualmente estoy ampliando mis conocimientos de Python y de los sistemas informáticos. También me interesan la biología y la ciencia en general.",
            "2025–2027 · Técnico en Sistemas Microinformáticos y Redes · IES Maestre de Calatrava, Ciudad Real.",
            "Educación Secundaria Obligatoria (ESO) · IES Juan de Ávila."
        ]
    },

    "pieza-cv-2-3": {
        datos: [
            "Prácticas formativas de 100 horas en Inmobiliaria La Mayor, Ciudad Real, del 7 al 26 de mayo de 2026.",
            "Realización de fotografías de inmuebles, creación de diseños y contenido visual con Canva y colaboración en la gestión de las redes sociales de la empresa.",
            "Lenguas maternas: español y rumano. Inglés: nivel C1."
        ]
    },

    "pieza-cv-3-3": {
        datos: [
            "Montaje y mantenimiento de equipos informáticos; instalación y configuración de sistemas operativos; configuración y administración de redes locales.",
            "Administración de usuarios y permisos; configuración de servicios de red; seguridad informática y resolución de incidencias.",
            "Programación básica con Python; ofimática y creación de contenido visual con Canva.",
            "Aficiones e intereses: dibujo y diseño, programación y desarrollo de videojuegos, ciencia, tecnología y divulgación científica."
        ]
    }
};


// Indica si el submenú de piezas del CV está desplegado.
let menuPiezasCVAbierto = false;


function obtenerPiezasCVRecogidas() {

    return objetosInventario.filter(
        objeto => objeto.tipo === "pieza-cv"
    );
}

/* ==========================================
   CONTADOR Y AVISO DE CURRÍCULUM COMPLETO
   ========================================== */

let mensajeFinalizacionMostrado = false;

function comprobarCurriculumCompleto() {

    const totalPiezas = Object.keys(datosPiezasCV).length;
    const piezasRecogidas = obtenerPiezasCVRecogidas().length;

    if (
        totalPiezas === 0 ||
        piezasRecogidas < totalPiezas ||
        mensajeFinalizacionMostrado
    ) {
        return;
    }

    mensajeFinalizacionMostrado = true;

    const aviso = document.getElementById("mensaje-finalizacion");
    aviso.classList.remove("oculta");

    // El aviso tiene su propio temporizador y no depende de los mensajes de escena.
    setTimeout(() => {
        aviso.classList.add("oculta");
    }, 5000);
}


function actualizarDescripcionCurriculum() {

    const curriculum = objetosInventario.find(
        objeto => objeto.id === "curriculum"
    );

    if (!curriculum) return;

    const piezas = obtenerPiezasCVRecogidas();

    if (piezas.length === 0) {
        curriculum.descripcion =
            "Un documento que contiene mi formación y experiencia.";
    } else {
        const nombrePieza = piezas.length === 1 ? "la pieza" : "las piezas";

        curriculum.descripcion =
            `Currículum recogido. Se ha añadido la información adicional de ${nombrePieza} que ya habías recuperado.`;
    }
}


/* ==========================================
   2. AÑADIR OBJETOS
   ========================================== */

let temporizadorMensajeEquipado = null;


function mostrarMensajeEquipado(objeto) {

    const mensaje = document.getElementById("mensaje-escena");
    const texto = `Objeto equipado: ${objeto.nombre}`;

    clearTimeout(temporizadorMensajeEquipado);
    mensaje.textContent = texto;

    temporizadorMensajeEquipado = setTimeout(() => {

        // No borrar un mensaje posterior de otra interacción.
        if (mensaje.textContent === texto) {
            mensaje.textContent = "";
        }

    }, 2500);
}


function añadirObjeto(id, nombre, categoria, descripcion, tipo) {

    const yaExiste = objetosInventario.some(
        objeto => objeto.id === id
    );

    if (yaExiste) return null;

    const nuevoObjeto = {
        id,
        nombre,
        categoria,
        descripcion,
        tipo,
        agotado: false
    };

    objetosInventario.push(nuevoObjeto);

    // Comprobar si se ha completado la colección de piezas del currículum.
    comprobarCurriculumCompleto();

    // Si la ranura está vacía, equipar automáticamente los objetos utilizables.
    const tiposEquipables = ["llave", "herramienta", "pieza"];

    if (!objetoEquipado && tiposEquipables.includes(tipo)) {
        equiparObjeto(nuevoObjeto);
        mostrarMensajeEquipado(nuevoObjeto);
    }

    // Mantener sincronizada la descripción del currículum.
    actualizarDescripcionCurriculum();

    actualizarInventario();

    return nuevoObjeto;
}


function retirarObjetoInventario(id) {

    const indice = objetosInventario.findIndex(
        objeto => objeto.id === id
    );

    if (indice === -1) return null;

    const [objetoRetirado] = objetosInventario.splice(indice, 1);

    if (objetoEquipado && objetoEquipado.id === id) {
        objetoEquipado = null;
        actualizarRanura();
    }

    if (objetoSeleccionado && objetoSeleccionado.id === id) {
        deseleccionarObjeto();
    }

    actualizarDescripcionCurriculum();
    actualizarInventario();

    return objetoRetirado;
}


/* ==========================================
   3. ACTUALIZAR INVENTARIO VISUAL
   ========================================== */

function actualizarInventario() {

    const lista = document.getElementById("lista-objetos");
    const progreso = document.getElementById("progreso");

    const piezasCV = obtenerPiezasCVRecogidas();
    const totalPiezasCV = Object.keys(datosPiezasCV).length;

    progreso.textContent =
        `Exploración: ${objetosInventario.length} objetos encontrados · Piezas de CV: ${piezasCV.length}/${totalPiezasCV}`;

    lista.innerHTML = "";
    const agruparPiezas = piezasCV.length >= 2;
    let grupoPiezasInsertado = false;

    objetosInventario.forEach(objeto => {

        if (objeto.tipo === "pieza-cv" && agruparPiezas) {

            // El grupo ocupa el lugar de la primera pieza en la lista.
            if (grupoPiezasInsertado) return;

            grupoPiezasInsertado = true;

            const grupo = document.createElement("div");
            grupo.classList.add("grupo-piezas-cv");

            const botonGrupo = document.createElement("button");
            botonGrupo.type = "button";
            botonGrupo.classList.add(
                "objeto-inventario",
                "boton-grupo-piezas-cv"
            );

            const nombreGrupo = document.createElement("span");
            nombreGrupo.textContent = "📄 Piezas de CV";

            const contador = document.createElement("sup");
            contador.classList.add("contador-piezas-cv");
            contador.textContent = piezasCV.length;

            botonGrupo.appendChild(nombreGrupo);
            botonGrupo.appendChild(contador);

            botonGrupo.addEventListener("click", evento => {
                evento.stopPropagation();

                menuPiezasCVAbierto = !menuPiezasCVAbierto;
                actualizarInventario();
            });

            grupo.appendChild(botonGrupo);

            const submenu = document.createElement("div");
            submenu.classList.add("submenu-piezas-cv");

            if (!menuPiezasCVAbierto) {
                submenu.classList.add("oculta");
            }

            piezasCV.forEach(pieza => {

                const botonPieza = document.createElement("button");
                botonPieza.type = "button";
                botonPieza.classList.add("objeto-inventario", "pieza-cv-agrupada");
                botonPieza.textContent = pieza.nombre;

                botonPieza.addEventListener("click", evento => {
                    evento.stopPropagation();
                    seleccionarObjeto(pieza);
                });

                submenu.appendChild(botonPieza);
            });

            grupo.appendChild(submenu);
            lista.appendChild(grupo);

            return;
        }

        if (objeto.tipo === "pieza-cv" && agruparPiezas) return;

        const elemento = document.createElement("button");

        elemento.classList.add("objeto-inventario");

        if (objeto.agotado) {
            elemento.classList.add("agotado");
        }

        elemento.textContent = objeto.nombre;

        elemento.addEventListener("click", () => {
            seleccionarObjeto(objeto);
        });

        lista.appendChild(elemento);
    });

    if (objetoSeleccionado) {
        mostrarDetalleObjeto(objetoSeleccionado);
    }
}


/* ==========================================
   4. SELECCIÓN DE OBJETOS
   ========================================== */

function marcarObjetoAgotado(id) {

    const objeto = objetosInventario.find(
        elemento => elemento.id === id
    );

    if (!objeto) return;

    objeto.agotado = true;
    actualizarInventario();
}


function seleccionarObjeto(objeto) {

    objetoSeleccionado = objeto;

    // Al elegir otro tipo de objeto, plegar el submenú de piezas.
    if (objeto.tipo !== "pieza-cv" && menuPiezasCVAbierto) {
        menuPiezasCVAbierto = false;
        actualizarInventario();
    }

    // Consultar un objeto nunca lo retira del inventario.
    mostrarDetalleObjeto(objeto);
}


function plegarGrupoPiezasCV() {
    menuPiezasCVAbierto = false;
}


function deseleccionarObjeto() {

    objetoSeleccionado = null;

    document.getElementById("nombre-objeto").textContent =
        "Selecciona un objeto";

    document.getElementById("categoria-objeto").textContent = "";

    const descripcion = document.getElementById("descripcion-objeto");
    descripcion.textContent = "Aquí aparecerá la información del objeto.";
    descripcion.classList.remove("agotado");

    document.getElementById("acciones-objeto").innerHTML = "";
}


/* ==========================================
   5. EQUIPAMIENTO
   ========================================== */

function equiparObjeto(objeto) {

    // Un objeto agotado permanece en el inventario, pero ya no se puede equipar.
    if (objeto.agotado) return;

    objetoEquipado = objeto;

    actualizarRanura();

    mostrarDetalleObjeto(objeto);
}


function desequiparObjeto() {

    objetoEquipado = null;

    actualizarRanura();

    if (objetoSeleccionado) {
        mostrarDetalleObjeto(objetoSeleccionado);
    }
}


function obtenerObjetoEquipado() {

    return objetoEquipado;
}


/* ==========================================
   6. ACTUALIZAR RANURA Y MENÚ
   ========================================== */

function actualizarRanura() {

    const ranura = document.getElementById("ranura-equipada");
    const icono = document.getElementById("icono-ranura");

    if (objetoEquipado) {

        ranura.dataset.tooltip = objetoEquipado.nombre;

        icono.textContent = objetoEquipado.nombre;

    } else {

        ranura.dataset.tooltip = "Sin objeto equipado";

        icono.textContent = "＋";
    }

    // Actualizar siempre la ranura.
    // Su visibilidad dependerá de la exploración,
    // no de si hay un objeto equipado.
}


/* ==========================================
   7. ABRIR INVENTARIO DESDE EQUIPAMIENTO
   ========================================== */

function abrirInventarioParaEquipamiento() {

    deseleccionarObjeto();

    document.getElementById("menu-equipamiento")
        .classList.add("oculta");

    document.getElementById("inventario")
        .classList.remove("oculta");
}


// Pulsar la ranura.
document.getElementById("ranura-equipada").addEventListener("click", () => {

    if (objetoEquipado) {

        // Si hay un objeto equipado, mostrar el menú.
        document.getElementById("menu-equipamiento")
            .classList.toggle("oculta");

    } else {

        // Si está vacía, abrir directamente el inventario.
        abrirInventarioParaEquipamiento();
    }
});


// Sustituir objeto equipado.
document.getElementById("sustituir-equipamiento")
    .addEventListener("click", evento => {

        evento.stopPropagation();

        abrirInventarioParaEquipamiento();
    });


/* ==========================================
   8. FICHA DEL OBJETO SELECCIONADO
   ========================================== */

function mostrarDetalleObjeto(objeto) {

    const nombre = document.getElementById("nombre-objeto");
    const categoria = document.getElementById("categoria-objeto");
    const descripcion = document.getElementById("descripcion-objeto");
    const acciones = document.getElementById("acciones-objeto");

    nombre.textContent = objeto.nombre;
    categoria.textContent = objeto.categoria;
    descripcion.textContent = objeto.descripcion;

    // La descripción se atenúa cuando el objeto ya no tiene usos.
    descripcion.classList.toggle("agotado", objeto.agotado);

    acciones.innerHTML = "";

    switch (objeto.tipo) {

        case "documento":

            if (objeto.id === "curriculum") {

                // Mostrar qué piezas ya se han incorporado al documento.
                const piezasRecogidas = obtenerPiezasCVRecogidas();

                piezasRecogidas.forEach(pieza => {

                    const elementoPieza = document.createElement("p");
                    elementoPieza.classList.add("pieza-incorporada-cv");
                    elementoPieza.textContent = pieza.nombre;

                    acciones.appendChild(elementoPieza);
                });

                const botonConsultar = document.createElement("button");

                botonConsultar.textContent = "Consultar documento";

                botonConsultar.addEventListener("click", evento => {

                    evento.stopPropagation();

                    document.getElementById("panel-cv")
                        .classList.remove("oculta");
                });

                acciones.appendChild(botonConsultar);
            }

            break;

        case "pieza-cv": {

            // El estado y los datos se muestran juntos en la ficha.
            descripcion.textContent = "";

            const curriculumRecogido = objetosInventario.some(
                objeto => objeto.id === "curriculum"
            );

            const estado = document.createElement("p");
            estado.classList.add("estado-pieza-cv");
            estado.textContent = curriculumRecogido
                ? "Estos datos ya se han añadido al currículum."
                : "Estos datos podrán organizarse en un currículum cuando lo encuentres.";

            acciones.appendChild(estado);

            const informacion = datosPiezasCV[objeto.id];

            if (informacion) {

                const contenedorDatos = document.createElement("div");
                contenedorDatos.classList.add("datos-pieza-cv");

                informacion.datos.forEach(dato => {

                    const parrafo = document.createElement("p");
                    parrafo.classList.add("dato-pieza-cv");

                    if (curriculumRecogido) {
                        parrafo.classList.add("incorporado");
                    }

                    parrafo.textContent = dato;
                    contenedorDatos.appendChild(parrafo);
                });

                acciones.appendChild(contenedorDatos);
            }

            break;
        }

        default:
            break;
    }


    // Solo los objetos utilizables pueden equiparse.
    if (
        ["llave", "herramienta", "pieza"].includes(objeto.tipo) &&
        !objeto.agotado
    ) {

        const botonEquipamiento = document.createElement("button");

        if (
            objetoEquipado &&
            objetoEquipado.id === objeto.id
        ) {

            botonEquipamiento.textContent = "Desequipar";

            botonEquipamiento.addEventListener("click", evento => {

                evento.stopPropagation();

                desequiparObjeto();
            });

        } else {

            botonEquipamiento.textContent = objetoEquipado
                ? "Sustituir objeto equipado"
                : "Equipar objeto";

            botonEquipamiento.addEventListener("click", evento => {

                evento.stopPropagation();

                equiparObjeto(objeto);
            });
        }

        acciones.appendChild(botonEquipamiento);
    }
}


/* ==========================================
   9. DESELECCIÓN DENTRO DEL INVENTARIO
   ========================================== */

document.getElementById("inventario").addEventListener("click", evento => {

    // Cualquier clic dentro de la ficha pliega el submenú,
    // sin impedir que se ejecute la acción pulsada.
    const dentroDeLaFicha = evento.target.closest("#detalle-objeto");

    if (menuPiezasCVAbierto && dentroDeLaFicha) {
        plegarGrupoPiezasCV();

        const submenu = document.querySelector(".submenu-piezas-cv");

        if (submenu) {
            submenu.classList.add("oculta");
        }

        return;
    }

    // Los botones del grupo y sus piezas gestionan sus propios clics.
    const dentroDelGrupo = evento.target.closest(".grupo-piezas-cv");

    // Pulsar una zona vacía del inventario pliega el grupo.
    if (
        menuPiezasCVAbierto &&
        !dentroDeLaFicha &&
        !dentroDelGrupo &&
        !evento.target.closest(".objeto-inventario")
    ) {
        plegarGrupoPiezasCV();
        actualizarInventario();
    }

}, true);

// Mostrar el contador inicial aunque todavía no se haya recogido ningún objeto.
actualizarInventario();
