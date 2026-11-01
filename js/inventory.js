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
   2. AÑADIR OBJETOS
   ========================================== */

function añadirObjeto(id, nombre, descripcion, tipo) {

    const yaExiste = objetosInventario.some(
        objeto => objeto.id === id
    );

    if (yaExiste) return;

    const nuevoObjeto = {
        id,
        nombre,
        descripcion,
        tipo
    };

    objetosInventario.push(nuevoObjeto);

    actualizarInventario();
}


/* ==========================================
   3. ACTUALIZAR INVENTARIO VISUAL
   ========================================== */

function actualizarInventario() {

    const lista = document.getElementById("lista-objetos");
    const progreso = document.getElementById("progreso");

    progreso.textContent =
        `Exploración: ${objetosInventario.length} objetos encontrados`;

    lista.innerHTML = "";

    objetosInventario.forEach(objeto => {

        const elemento = document.createElement("button");

        elemento.classList.add("objeto-inventario");
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

function seleccionarObjeto(objeto) {

    objetoSeleccionado = objeto;

    mostrarDetalleObjeto(objeto);
}


function deseleccionarObjeto() {

    objetoSeleccionado = null;

    document.getElementById("nombre-objeto").textContent =
        "Selecciona un objeto";

    document.getElementById("descripcion-objeto").textContent =
        "Aquí aparecerá la información del objeto.";

    document.getElementById("acciones-objeto").innerHTML = "";
}


/* ==========================================
   5. EQUIPAMIENTO
   ========================================== */

function equiparObjeto(objeto) {

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
    const descripcion = document.getElementById("descripcion-objeto");
    const acciones = document.getElementById("acciones-objeto");

    nombre.textContent = objeto.nombre;
    descripcion.textContent = objeto.descripcion;

    acciones.innerHTML = "";

    switch (objeto.tipo) {

        case "documento":

            if (objeto.id === "curriculum") {

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

        case "llave":
            acciones.textContent =
                "Esta llave puede abrir una cerradura.";
            break;

        case "herramienta":
            acciones.textContent =
                "Herramienta disponible para usar.";
            break;

        case "pieza":
            acciones.textContent =
                "Pieza que puede formar parte de un mecanismo.";
            break;

        case "pieza-cv":
            acciones.textContent =
                "Fragmento recuperado. Forma parte de mi currículum.";
            break;

        default:
            acciones.textContent =
                "No hay acciones disponibles.";
    }


    // Solo los objetos utilizables pueden equiparse.
    if (["llave", "herramienta", "pieza"].includes(objeto.tipo)) {

        const botonEquipamiento = document.createElement("button");

        if (
            objetoEquipado &&
            objetoEquipado.id === objeto.id
        ) {

            botonEquipamiento.textContent = "Desequipar";

            botonEquipamiento.addEventListener("click", () => {
                desequiparObjeto();
            });

        } else {

            botonEquipamiento.textContent = objetoEquipado
                ? "Sustituir objeto equipado"
                : "Equipar objeto";

            botonEquipamiento.addEventListener("click", () => {
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

    if (
        !evento.target.closest(".objeto-inventario") &&
        !evento.target.closest("#detalle-objeto")
    ) {
        deseleccionarObjeto();
    }
});