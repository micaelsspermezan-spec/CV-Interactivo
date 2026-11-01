# CV-Interactivo — Estado del proyecto

> Documento de referencia del proyecto. Actualizarlo cuando cambien la estructura, las mecánicas o las decisiones técnicas.

## 1. Descripción

CV interactivo de Micael Samuel, desarrollado como una experiencia de exploración tipo escape room / point-and-click. El visitante explora una cabaña, recoge objetos, resuelve pequeños mecanismos y descubre fragmentos de información del currículum.

La ambientación prevista combina una cabaña oscura y misteriosa, madera, elementos de latón y acentos cian. La inspiración general incluye experiencias interactivas como Bruno Simon y Surgeon Simulator. La escena actual utiliza botones y elementos CSS provisionales; la integración de ilustraciones y recursos visuales queda para una fase posterior.

El proyecto se desarrolla en HTML, CSS y JavaScript vanilla desde Visual Studio Code en Windows.

## 2. Estructura actual del repositorio

La siguiente estructura refleja el código presente en la rama `main` en la fecha de esta documentación. Se detallan principalmente las secciones internas, no solo los archivos.

```text
CV-Interactivo/
│
├── index.html
│   ├── head
│   │   ├── Metadatos y viewport
│   │   ├── Título: CV - Micael Samuel
│   │   └── Enlace a css/style.css
│   │
│   └── body
│       ├── #wip
│       ├── #inicio
│       │   └── .contenido-inicio
│       │       ├── .etiqueta-seccion
│       │       ├── Título y texto introductorio
│       │       ├── #entrar
│       │       └── #ver-cv
│       │
│       ├── #exploracion
│       │   ├── .cabecera-exploracion
│       │   │   ├── #volver-menu
│       │   │   ├── Título de la cabaña
│       │   │   └── #abrir-inventario
│       │   ├── #contenedor-equipamiento
│       │   │   ├── #ranura-equipada
│       │   │   │   └── #icono-ranura
│       │   │   └── #menu-equipamiento
│       │   │       └── #sustituir-equipamiento
│       │   ├── #escena
│       │   │   ├── #volver
│       │   │   └── #zonas-interactivas
│       │   │       ├── #poster-cv
│       │   │       ├── #llave-hierro
│       │   │       ├── #llave-laton
│       │   │       ├── #cajon-laton
│       │   │       ├── #pieza-cv-1-3
│       │   │       └── #mensaje-escena
│       │   └── #inventario
│       │       ├── #cabecera-inventario
│       │       │   ├── Título
│       │       │   └── #cerrar-inventario
│       │       ├── #progreso
│       │       ├── #lista-objetos
│       │       └── #detalle-objeto
│       │           ├── #nombre-objeto
│       │           ├── #descripcion-objeto
│       │           └── #acciones-objeto
│       │
│       └── #panel-cv
│           ├── #cabecera-cv
│           │   ├── Título
│           │   └── #cerrar-cv
│           └── #contenido-cv
│
├── css/
│   └── style.css
│       ├── 1. Variables y configuración general
│       ├── 2. Pantallas y visibilidad
│       ├── 3. Menú principal
│       ├── 4. Botones y elementos interactivos
│       ├── 5. Cabecera y navegación
│       ├── 6. Escena principal
│       ├── 7. Inventario y panel del currículum
│       ├── 8. Cabeceras de los paneles
│       ├── 9. Contenido del inventario
│       ├── 10. Contenido del currículum
│       ├── 11. Etiqueta WIP
│       ├── 12. Ranura de equipamiento
│       ├── 12.1. Menú de equipamiento
│       ├── 13. Adaptación a pantallas pequeñas
│       └── Mensajes de interacción de la escena
│
├── js/
│   ├── inventory.js
│   │   ├── 1. Datos del inventario
│   │   ├── 2. Añadir objetos
│   │   ├── 3. Actualizar inventario visual
│   │   ├── 4. Selección de objetos
│   │   ├── 5. Equipamiento
│   │   ├── 6. Actualizar ranura y menú
│   │   ├── 7. Abrir inventario desde equipamiento
│   │   ├── 8. Ficha del objeto seleccionado
│   │   └── 9. Deselección dentro del inventario
│   │
│   ├── puzzles.js
│   │   └── 1. Cajón con cerradura de latón
│   │
│   ├── navigation.js
│   │   └── Vacío; reservado para navegación avanzada
│   │
│   └── main.js
│       ├── 1. Referencias HTML
│       ├── 2. Navegación
│       ├── 3. Panel del currículum
│       ├── 4. Inventario
│       ├── 5. Póster del currículum
│       ├── 6. Llave de hierro
│       ├── 7. Llave de latón
│       ├── 8. Cajón con cerradura de latón
│       ├── 9. Pieza de currículum
│       └── 10. Detección de clics exteriores
│
└── assets/
    └── (carpetas de recursos visuales previstas; confirmar contenido en local)
```

**Nota sobre la estructura:** en el `index.html` actual, los scripts se cargan al final del body en este orden: `inventory.js`, `puzzles.js`, `navigation.js` y `main.js`. `navigation.js` está vacío por ahora.

## 3. Responsabilidad de los módulos

- **index.html:** estructura de las pantallas, escena, objetos interactivos, inventario y panel del CV.
- **style.css:** variables visuales, disposición, estados de visibilidad, paneles, botones, ranura de equipamiento y adaptación móvil.
- **inventory.js:** datos del inventario en memoria, recogida, listado, selección, ficha, equipamiento y ranura.
- **puzzles.js:** lógica de mecanismos y comprobación de objetos equipados. Actualmente gestiona el cajón de latón.
- **navigation.js:** reservado para navegación avanzada; todavía no contiene lógica.
- **main.js:** coordinación de eventos de interfaz, cambios entre menú y exploración, apertura/cierre de paneles y recogida de objetos de la escena.

## 4. Mecánicas presentes en el código

### Navegación y paneles

- Pantalla inicial con botón para entrar en la cabaña.
- Botón para volver al menú principal.
- Panel del currículum independiente.
- Inventario que puede abrirse y cerrarse.
- Detección de clics exteriores para cerrar paneles.
- La vuelta al menú limpia el mensaje temporal de escena y la selección, pero no reinicia los objetos recogidos ni el estado de los mecanismos.

### Inventario

- Los objetos se almacenan en el array `objetosInventario`.
- Se evita añadir dos veces un objeto con el mismo ID.
- El inventario genera un botón por objeto y muestra el contador de objetos encontrados.
- Al seleccionar un objeto se muestra su ficha y las acciones disponibles.

### Equipamiento

- Existe una única ranura de equipamiento.
- Si está vacía, pulsarla abre el inventario.
- Si contiene un objeto, pulsarla abre el menú para sustituirlo.
- Las llaves, herramientas y piezas de mecanismo son los tipos equipables definidos actualmente.
- El objeto equipado se conserva en memoria mientras la página no se recargue.

### Recogida y puzle

- El póster se recoge como documento y desbloquea el botón para consultar el CV.
- Se pueden recoger una llave de hierro y una llave de latón.
- El cajón requiere una llave equipada.
- La llave de hierro no abre el cajón; la llave de latón sí.
- Al abrirlo aparece la pieza de CV 1/3 en la escena.
- La pieza se puede recoger y añadir al inventario como tipo `pieza-cv`.

## 5. Estado y límites actuales

- La escena es provisional y está construida con botones; todavía no hay una habitación ilustrada ni movimiento libre.
- Los objetos y el progreso se guardan solo en memoria JavaScript: al recargar la página se reinicia el estado.
- El panel del CV todavía contiene texto provisional; falta diseñar las secciones y la incorporación de fragmentos.
- Solo está implementado un mecanismo: el cajón con cerradura de latón.
- No hay todavía sistema general de guardado, persistencia, audio, animaciones ni navegación avanzada.
- `navigation.js` está vacío.
- La carpeta `assets` está prevista para recursos visuales; confirmar su contenido real en el equipo local.

## 6. Decisiones que debemos mantener

- Mantener los archivos y nombres actuales salvo que exista una razón clara para cambiarlos.
- Mantener el código modular y comentado, con secciones numeradas.
- El árbol del proyecto debe describir las secciones internas de los archivos, no limitarse a enumerar nombres.
- Actualizar este documento cuando se añadan secciones, objetos, mecánicas o módulos.
- No introducir imágenes todavía: primero se completará la lógica y se sustituirán los botones provisionales en una fase visual posterior.
- El currículum debe poder consultarse sin obligar al visitante a resolver todos los puzles.
- Los fragmentos del CV serán coleccionables y podrán representar formación, experiencia, competencias, idiomas y proyectos.

## 7. Próximas tareas

1. Revisar el comportamiento del inventario al equipar, sustituir y desequipar objetos, asegurando que el panel no se cierre inesperadamente.
2. Probar de nuevo el flujo completo: recoger ambas llaves, equipar la incorrecta, probar el cajón, sustituirla por la correcta, abrir el cajón y recoger la pieza.
3. Definir el sistema de fragmentos del CV y cómo se integran en el panel independiente.
4. Diseñar el contenido real del currículum.
5. Incorporar persistencia del progreso cuando la estructura de juego esté más definida.
6. Planificar la fase visual de la cabaña y los objetos.

## 8. Flujo de trabajo con Git

El repositorio remoto es privado y usa la rama principal `main`.

Después de modificar archivos en local:

```bash
git status
git add .
git commit -m "Descripción breve del cambio"
git push
```

Para obtener cambios que ya estén en GitHub:

```bash
git pull
```

Antes de empezar una sesión de trabajo, comprobar que la copia local está sincronizada. No editar simultáneamente el mismo archivo en local y directamente en GitHub sin sincronizar después.

## 9. Normas de trabajo y transparencia

Estas normas son obligatorias para cualquier persona o asistente que colabore en el proyecto.

### Comunicación con el usuario

- Hablar en español y utilizar explicaciones breves y claras.
- Referirse a los archivos por su nombre y, sobre todo, a las secciones numeradas o identificadores concretos que el usuario reconoce en el código.
- No utilizar hashes de commits, nombres internos de Git ni jerga técnica como explicación principal. Si es necesario mencionarlos, explicar inmediatamente qué significan.
- Trabajar paso a paso. No encadenar tareas o cambios distintos sin explicar primero el siguiente paso.

### Antes de modificar código

- Consultar el estado actual de la rama `main` y leer la versión vigente de los archivos que se vayan a tocar.
- Explicar qué archivo se modificará, qué sección concreta se verá afectada, qué comportamiento se pretende conseguir y por qué.
- Si el cambio implica una decisión de diseño o varias alternativas relevantes, explicarlas y esperar la elección del usuario antes de implementarlo.
- No pedir al usuario que vuelva a pegar código que ya esté disponible en el repositorio.

### Seguridad y revisión del código

- No añadir código ofuscado, oculto o innecesariamente complejo.
- No añadir telemetría, analítica, recopilación o envío de datos, conexiones externas, dependencias, scripts de terceros, almacenamiento de credenciales ni comunicaciones con servidores sin explicarlo previamente y obtener aprobación explícita.
- No introducir funciones que no estén relacionadas con el CV interactivo.
- Explicar cualquier uso de `fetch`, solicitudes HTTP, almacenamiento local, cookies, APIs externas, carga dinámica de scripts o dependencias nuevas antes de incorporarlo.
- Mantener el código legible, comentado y modular para que el usuario pueda inspeccionarlo.
- No afirmar que el código es completamente seguro ni que se ha auditado exhaustivamente. Indicar qué se ha revisado y qué queda fuera de la comprobación.

### Después de cada modificación

- Indicar el archivo modificado y la sección exacta.
- Describir las líneas o bloques añadidos, modificados o eliminados. Cuando sea posible, proporcionar los números de línea de la versión guardada y explicar el código en lenguaje normal.
- Mostrar el fragmento relevante antes/después cuando ayude a revisar el cambio.
- Explicar el efecto esperado y cualquier posible impacto en otras funciones.
- Verificar recuperando el archivo desde GitHub que el contenido se ha guardado correctamente.
- Indicar claramente si el usuario debe hacer `git pull` en VS Code. Si no se modificó ningún archivo, decirlo expresamente.
- No dar por probado un comportamiento que no se haya ejecutado realmente. Diferenciar entre revisión del código y prueba funcional realizada por el usuario.

### Control del trabajo

- Trabajar en la rama `main`, salvo que el usuario indique otra.
- No modificar archivos directamente sin haber explicado previamente el cambio y obtenido la conformidad del usuario.
- No realizar cambios adicionales, limpiezas o refactorizaciones que no formen parte de la tarea acordada.
- Mantener actualizado este documento cuando cambien la estructura, las mecánicas, las decisiones o las próximas tareas del proyecto.
