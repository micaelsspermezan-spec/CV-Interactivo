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
│       │   │   ├── #navegacion-perspectivas
│       │   │   │   ├── #perspectiva-anterior
│       │   │   │   ├── #indicador-perspectiva
│       │   │   │   └── #perspectiva-siguiente
│       │   │   ├── .vista-pared (1–4, cabaña)
│       │   │   ├── #zonas-interactivas (pared 1)
│       │   │   └── .vista-exterior (4 perspectivas)
│       │   │       ├── #puerta-salida-cabana
│       │   │       └── #puerta-regreso-cabana
│       │   │       ├── #poster-cv
│       │   │       ├── #llave-hierro
│       │   │       ├── #llave-laton
│       │   │       ├── #cajon-laton
│       │   │       ├── #pieza-cv-1-3
│       │   │       ├── #mensaje-escena
│       │   │       ├── #slot-caballo-izquierdo y #slot-caballo-derecho (pared 2)
│       │   │       └── #buzon-oxidado (exterior derecho)
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
│               ├── #datos-personales-cv
│               ├── [data-pieza-cv="1"] · Perfil y formación
│               ├── [data-pieza-cv="2"] · Experiencia e idiomas
│               └── [data-pieza-cv="3"] · Competencias e intereses
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
│   │   ├── 5. Equipamiento y autoequipamiento
│   │   ├── 6. Retirada de objetos y actualización de ranura
│   │   ├── 7. Abrir inventario desde equipamiento
│   │   ├── 8. Ficha del objeto seleccionado
│   │   └── 9. Deselección dentro del inventario
│   │
│   ├── puzzles.js
│   │   ├── 1. Cajón con cerradura de latón
│   │   └── 2. Puzle de los caballos: buzón, slots y selección/intercambio
│   │
│   ├── navigation.js
│   │   ├── 1. Configuración de las perspectivas
│   │   ├── 2. Mostrar una perspectiva
│   │   └── 3. Inicializar los controles
│   │
│   └── main.js
│       ├── 1. Referencias HTML
│       ├── 2. Navegación
│       ├── 3. Panel del currículum
│       ├── 4. Inventario
│       ├── 5. Póster del currículum
│       ├── 6. Llave de hierro y autoequipamiento
│       ├── 7. Llave de latón
│       ├── 8. Cajón con cerradura de latón
│       ├── 9. Recogida de las piezas del currículum
│       ├── 10. Desbloqueo de fragmentos del CV
│       └── 11. Detección de clics exteriores
│
└── assets/
    └── (carpetas de recursos visuales previstas; confirmar contenido en local)
```

**Nota sobre la estructura:** `index.html` conserva la interfaz general y carga `js/cargar-escena.js`. Este cargador inserta `escenas/cabana.html` en `#contenido-escena` y, después, carga secuencialmente `inventory.js`, `puzzles.js`, `navigation.js` y `main.js`. La escena externa contiene cuatro perspectivas de la cabañita y cuatro del exterior.

### Arquitectura de escenas

La aplicación separa el contenido de las escenas del documento principal, sin convertir cada perspectiva en un archivo independiente.

- `index.html` conservará la estructura general de la aplicación: menú, interfaz de exploración, cabecera, equipamiento, contenedor de escena, inventario y panel del currículum.
- `escenas/cabana.html` contiene tanto las cuatro perspectivas de la cabañita como las cuatro perspectivas de la zona exterior. La cabañita y el exterior siguen siendo zonas diferenciadas dentro de la navegación.
- Más adelante, cuando se empiece a desarrollar la casa grande, se creará `escenas/mansion.html`. Si esa escena crece mucho, se podrá dividir en más archivos, pero no se crearán archivos individuales para cada habitación o perspectiva sin una necesidad real.
- La escena externa se inserta en el contenedor `#contenido-escena` de `index.html` mediante `fetch`, sin recargar la aplicación.
- Como los módulos JavaScript consultan elementos de la escena mediante sus IDs, `js/cargar-escena.js` espera a que `cabana.html` se haya cargado e insertado antes de cargar secuencialmente `inventory.js`, `puzzles.js`, `navigation.js` y `main.js`.
- El uso de `fetch` para cargar HTML externo requiere ejecutar el proyecto mediante un servidor web local. Durante el desarrollo se utilizará Live Server desde VS Code. Abrir `index.html` directamente con la dirección `file://` no permitirá cargar las escenas externas.
- No se añadirán dependencias, paquetes ni servicios externos para esta reorganización.

### Ejecución y entrega

- La entrega deberá ser sencilla de abrir y revisar, sin exigir al profesor instalar Node.js, Python, paquetes ni dependencias.
- Se preparará un archivo `LEEME.txt` con instrucciones claras de ejecución, contenido del proyecto y explicación breve de su funcionamiento.
- Se valorará publicar una versión ejecutable mediante GitHub Pages, de modo que el profesor pueda abrirla desde un enlace, y acompañarla de una copia del código fuente.
- La publicación y el formato definitivo de entrega se decidirán más adelante. No se configurarán automatizaciones ni servicios de publicación sin explicarlo y acordarlo previamente.


## 3. Responsabilidad de los módulos

- **index.html:** estructura de las pantallas, interfaz general, contenedor de escena, inventario y panel del CV.
- **escenas/cabana.html:** perspectivas de la cabañita y del exterior.
- **style.css:** variables visuales, disposición, estados de visibilidad, paneles, botones, ranura de equipamiento y adaptación móvil.
- **inventory.js:** datos del inventario en memoria, recogida, listado, selección, ficha, equipamiento y ranura.
- **puzzles.js:** lógica de mecanismos y comprobación de objetos equipados. Gestiona el cajón de latón y el puzle de los caballos, incluido el buzón y el intercambio de objetos de escenario en sus slots.
- **navigation.js:** gestiona el cambio circular entre las cuatro perspectivas de la cabaña y las cuatro perspectivas de la zona exterior, además de las transiciones entre ambas. La gestión de la casa grande, sus habitaciones y las vistas ampliadas queda pendiente.
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
- Cada objeto distingue entre `tipo` (comportamiento interno), `categoria` (etiqueta visible), `descripcion` (texto breve) y `agotado` (estado que atenúa la descripción).
- Se evita añadir dos veces un objeto con el mismo ID.
- El inventario muestra los objetos recogidos y el contador de objetos encontrados.
- La primera pieza del CV aparece como un objeto individual. Al recoger una segunda pieza, todas las piezas se agrupan bajo el elemento «Piezas de CV», con un reborde distintivo y un contador en superíndice.
- El grupo despliega un submenú flotante anclado a su botón, superpuesto al inventario y sin alterar la distribución de los demás objetos. Los botones del inventario mantienen un tamaño uniforme. Pulsar cualquier zona de la ficha de un objeto —incluidos título, categoría, descripción, espacios vacíos y botones de acción— pliega el submenú sin cerrar el inventario ni ocultar la ficha; la acción del elemento pulsado sigue ejecutándose normalmente. Pulsar una zona vacía del inventario también lo pliega. Seleccionar otro objeto pliega el submenú y actualiza su ficha sin cerrar el inventario. La detección de clic exterior respeta la ruta original del evento aunque se reconstruya la lista. Cerrar el inventario o pulsar fuera también pliega el submenú.
- Al seleccionar un objeto se muestra su nombre, categoría y descripción breve, además de las acciones disponibles.
- La categoría y la descripción se muestran en blanco; la descripción puede pasar a gris cuando el objeto se marca como agotado.
- Cada objeto almacena por separado su tipo interno, categoría visible, descripción y estado de agotamiento.
- Las fichas de las piezas del CV muestran sus datos y adaptan el mensaje y el color según se haya recogido o no el currículum.
- Las piezas del CV permanecen en el inventario y se pueden consultar tantas veces como se quiera, independientemente de cuándo se haya recogido el currículum.
- La descripción del currículum se actualiza automáticamente al recoger piezas y enumera las piezas recuperadas.
- Los datos de cada pieza se centralizan en el registro `datosPiezasCV` de `inventory.js`, preparado para añadir nuevas piezas.

### Equipamiento

- Existe una única ranura de equipamiento.
- Si está vacía, pulsarla abre el inventario.
- Si contiene un objeto, pulsarla abre el menú para sustituirlo.
- Las llaves, herramientas y piezas de mecanismo son los tipos equipables definidos actualmente.
- Cuando se recoge un objeto equipable y la ranura está vacía, se equipa automáticamente.
- El autoequipamiento muestra durante 2,5 segundos un mensaje en la escena con el nombre del objeto. El temporizador no borra mensajes posteriores de otras interacciones.
- Si ya hay otro objeto equipado, recoger un objeto nuevo no lo sustituye automáticamente.
- Los objetos equipables pueden equiparse manualmente desde la ficha del inventario y el objeto equipado se conserva en memoria mientras la página no se recargue.

### Recogida y puzle

- Los objetos normales se recogen y se almacenan en el inventario. Algunos podrán equiparse y utilizarse sobre elementos de la escena.
- El póster se recoge como documento y desbloquea el botón para consultar el CV.
- Se pueden recoger una llave de hierro y una llave de latón.
- El cajón requiere una llave equipada.
- La llave de hierro no abre el cajón; la llave de latón sí.
- Al abrirlo aparece la pieza de CV 1/3 en la escena.
- Las piezas 2 y 3 siguen disponibles directamente en la escena de forma provisional; se retirarán de ahí cuando estén implementados sus puzles.
- Las tres piezas se añaden al inventario como tipo `pieza-cv`. Cada recogida revela el fragmento correspondiente del currículum.

### Puzles definidos para la primera versión

El puzle de los caballos descrito a continuación ya está implementado en la pared izquierda de la cabañita. El puzle del cuervo y el de los trofeos siguen pendientes. Sus ubicaciones y objetos respetarán la navegación por perspectivas ya existente; por ahora no se añadirán vistas ampliadas.

#### Puzle del cuervo — Pieza 1

- En el tejado del recibidor de la casa grande hay un cuervo en un nido que guarda una llave de cobre en el pico.
- Pulsar el cuervo o el nido antes de resolver el puzle muestra que está demasiado alto para alcanzarlo.
- El jugador deberá encontrar semillas, pienso u otra comida apropiada y colocarla en el cuenco del perro.
- El cuervo bajará a comer y dejará caer la llave de cobre.
- La llave de cobre abre el cofre situado sobre el escritorio de la cabañita. Dentro estará la Pieza 1 del currículum.

#### Puzle de los caballos — Pieza 2 (implementado)

- La pared izquierda de la cabañita tiene dos slots: el izquierdo con borde dorado y el derecho con borde plateado. El caballito dorado comienza en el slot izquierdo y mira hacia la derecha.
- El caballito dorado es un objeto de escenario: no se recoge ni pasa al inventario. Al pulsarlo queda seleccionado con un contorno visible y muestra únicamente la descripción «Un caballito dorado».
- El buzón oxidado de la perspectiva exterior derecha se abre únicamente si la llave de hierro está equipada. Al abrirlo, se añade el caballito plateado al inventario como objeto normal.
- El caballito plateado se puede equipar desde el inventario. Al usarlo sobre un slot vacío de la pared, se retira del inventario y se convierte en objeto de escenario.
- Los objetos de escenario se seleccionan con un contorno visible. Al seleccionar otro objeto de escenario, ambos intercambian posiciones; si el destino está vacío, el objeto seleccionado se desplaza a él. Volver a pulsar el mismo objeto no produce ningún efecto.
- Pulsar fuera de los slots no cancela la selección ni interfiere con otras acciones de la escena.
- La solución es el caballito dorado en el slot izquierdo y el plateado en el derecho, mirándose frente a frente. Al completarla aparece la Pieza 2 del currículum.
- La lógica de selección e intercambio está planteada para reutilizarse en el puzle de los trofeos.

#### Puzle de los trofeos — Pieza 3

- La pared derecha de la cabañita tiene inicialmente tres posiciones para trofeos. El primer hueco desde la izquierda ya contiene un cráneo de ciervo, pero está mal colocado.
- Los tres trofeos son una cabra con los cuernos cortados, un ciervo con cuernos medianos y un alce con cuernos grandes.
- La solución se deduce observando los árboles del bosque izquierdo: los trofeos deben colocarse de izquierda a derecha en el orden inverso al de los árboles. Con la disposición inicial de tres árboles, el orden correcto de los trofeos es cabra, ciervo y alce.
- El cráneo de alce está colocado encima de la puerta de la cabañita. El cráneo de cabra pertenece a un cadáver atrapado en un cepo del bosque derecho. El cráneo de ciervo es el que ya está en la pared de trofeos.
- Los cráneos que ya forman parte de la pared no se recogen al pulsarlos. En su lugar, el cráneo pulsado queda seleccionado con un reborde y después se puede pulsar otra posición de la pared para cambiarlo de sitio. Los cráneos que se encuentren fuera de la pared sí se recogen al inventario y desde allí se podrán colocar.
- Al completar el orden correcto se obtiene la Pieza 3 del currículum.
- El mecanismo debe ser dinámico: no debe asumir que siempre habrá tres árboles o tres huecos. En futuras ampliaciones podrá haber cuatro o cinco árboles y el sistema deberá admitir el mismo número de posiciones y trofeos, manteniendo la regla del orden inverso.

### Presentación del currículum pendiente de descubrir

La información de los bloques que todavía no se hayan desbloqueado se representará mediante líneas negras colocadas donde iría el texto, simulando texto censurado. Al conseguir la pieza correspondiente, las líneas se sustituirán por el contenido real. Se mantiene la cabecera personal visible desde el principio.

## 5. Estado y límites actuales

- La escena es provisional y está construida con botones y composiciones CSS sencillas. La cabaña y la zona exterior permiten recorrer sus cuatro perspectivas mediante flechas; todavía no hay habitaciones ilustradas ni movimiento libre.
- Los objetos y el progreso se guardan solo en memoria JavaScript: al recargar la página se reinicia el estado.
- El panel del CV contiene la cabecera personal visible y tres fragmentos en un único documento.
- Cada pieza revela su bloque correspondiente: pieza 1 (perfil y formación), pieza 2 (experiencia e idiomas) y pieza 3 (competencias digitales e intereses).
- En el inventario, cada pieza muestra sus datos en blanco si el currículum aún no se ha recogido y en gris si ya se han incorporado. El mensaje de estado cambia automáticamente según el orden de recogida.
- Los bloques del currículum aún no descubiertos deberán mostrar líneas negras simulando texto censurado; al recoger su pieza se mostrará el texto real.
- Están implementados el cajón con cerradura de latón y la primera versión del puzle de los caballos (buzón, recogida/equipamiento del caballito plateado, slots e intercambio de posiciones). El cuervo y los trofeos siguen pendientes.
- No hay todavía sistema general de guardado, persistencia, audio ni animaciones complejas.
- `navigation.js` permite cambiar entre las cuatro paredes de la cabaña y las cuatro perspectivas exteriores. La transición a la casa grande y sus habitaciones todavía no están implementadas.
- La reorganización de escenas está implementada: las ocho perspectivas de la cabañita y el exterior se encuentran en `escenas/cabana.html` y se cargan dinámicamente desde `index.html`.
- La carpeta `assets` está prevista para recursos visuales; confirmar su contenido real en el equipo local.

## 6. Decisiones que debemos mantener

- Mantener los archivos y nombres actuales salvo que exista una razón clara para cambiarlos.
- Mantener el código modular y comentado, con secciones numeradas.
- El árbol del proyecto debe describir las secciones internas de los archivos, no limitarse a enumerar nombres.
- Actualizar este documento cuando se añadan secciones, objetos, mecánicas o módulos.
- No introducir imágenes todavía: primero se completará la lógica y se sustituirán los botones provisionales en una fase visual posterior.
- El currículum debe poder consultarse sin obligar al visitante a resolver todos los puzles.
- El currículum se presenta como un único documento parcialmente vacío: la cabecera personal permanece visible y cada pieza revela su bloque en la posición correspondiente.
- La numeración de las piezas no está limitada a tres; la primera versión incluye tres bloques: (1) perfil y formación, (2) experiencia e idiomas y (3) competencias digitales e intereses.
- Los fragmentos conservan su espacio aunque todavía no se hayan desbloqueado, sin mostrar siluetas, bordes ni indicadores de contenido pendiente.
- La exploración se organizará como una aventura point-and-click por vistas: cada habitación tendrá varias perspectivas o paredes entre las que se cambiará mediante flechas en pantalla.
- La primera zona es una cabañita independiente con cuatro paredes: frontal (escritorio y cajón), izquierda, trasera (puerta de salida) y derecha. La puerta trasera ya conecta con la zona exterior y permite regresar a la cabañita.
- Al salir por la puerta trasera de la cabañita se llega a una zona exterior abierta, no a un pasillo cerrado. Esta zona cuenta con cuatro perspectivas: frente hacia la casa grande, laterales hacia el bosque y parte trasera hacia la cabañita. Ya se puede regresar a la cabañita; la conexión con la casa grande aún está pendiente.
- La casa grande será la zona principal de exploración y contendrá distintas habitaciones. Su distribución y conexiones están pendientes de diseño.
- La cabañita, el exterior y la casa grande son zonas distintas; las vistas exteriores no se consideran paredes adicionales de la cabañita. La flecha derecha avanza hacia la derecha y la izquierda hacia la izquierda; al regresar desde el exterior se entra mirando al escritorio. Las perspectivas cuentan con arte provisional CSS: escritorio, cofre y ventana; mesita con caballo; tres siluetas de trofeos con las laterales elevadas y la central más baja; puerta; casa grande; tres árboles con el central más pequeño y elevado; buzón oxidado y cobertizo. Estas composiciones son decorativas y no implementan todavía los puzles.
- Cada perspectiva podrá contener zonas interactivas. Al pulsarlas, podrán llevar a otra habitación o activar interacciones sencillas directamente sobre la escena.
- Por decisión actual, no se priorizarán vistas ampliadas: los primeros puzles se resolverán desde las perspectivas existentes mediante interacciones sencillas. Esta decisión podrá revisarse más adelante si la complejidad de algún mecanismo lo justifica.
- `navigation.js` será el módulo encargado de gestionar las perspectivas, las habitaciones y las transiciones entre vistas. `puzzles.js` conservará la lógica y las condiciones de resolución de los mecanismos; `inventory.js` seguirá gestionando los objetos y el equipamiento.
- El contenido de las escenas se externalizará siguiendo esta estructura: `index.html` para la interfaz general, `escenas/cabana.html` para cabañita y exterior, y `escenas/mansion.html` cuando se desarrolle la casa grande. No se dividirán las escenas por perspectiva salvo que el tamaño lo justifique.
- Las escenas externas se cargarán con `fetch` dentro del contenedor de escena. La inicialización de los módulos que dependen de sus elementos deberá ejecutarse después de insertar el HTML.
- El proyecto se ejecutará durante el desarrollo mediante un servidor local (Live Server); no se considerará válida la apertura directa con `file://` una vez externalizadas las escenas.
- La entrega se preparará para que el profesor pueda probarla sin instalar dependencias: se estudiará GitHub Pages y se añadirá un `LEEME.txt` con instrucciones, además de conservar una copia del código fuente.

## 7. Próximos objetivos

Los objetivos de esta sección describen funcionalidades y mejoras que todavía queremos desarrollar. Las comprobaciones y pruebas de funcionamiento se realizan durante el desarrollo y no se consideran objetivos independientes.

### 7.1. Funcionalidades por desarrollar

1. [x] Reorganizar la estructura HTML: mantener la interfaz general en `index.html`, mover las cuatro perspectivas de la cabañita y las cuatro del exterior a `escenas/cabana.html`, cargarlas mediante `fetch` y ejecutar los módulos después de insertar la escena. Actualizar el árbol del proyecto y documentar el uso de Live Server. La navegación y las interacciones principales se han comprobado en navegador mediante Live Server.

2. Implementar los puzles pendientes: el cuervo (Pieza 1) y los trofeos (Pieza 3), junto con los objetos necesarios y sus interacciones. El puzle de los caballos (Pieza 2) ya tiene una primera implementación.
3. Conectar la zona exterior con la casa grande y desarrollar las perspectivas y zonas interactivas necesarias para los puzles. De momento, las interacciones se resolverán directamente desde las perspectivas existentes, sin vistas ampliadas.
4. Incorporar un sistema de guardado persistente con tres ranuras independientes. Debe permitir guardar el progreso actual, cargar una partida guardada y empezar una nueva partida cuando se quiera.
5. Añadir al menú principal un botón «Guardar» junto al acceso al menú principal durante la exploración. El botón «Entrar» cargará directamente si no existe ninguna partida guardada; si hay partidas guardadas, abrirá un pequeño menú para elegir una. El menú principal también incluirá «Nueva partida» para iniciar una partida desde cero.

### 7.2. Mejoras visuales

1. Revisar y mejorar el diseño visual del documento del currículum, manteniendo su presentación como un único documento que se completa por fragmentos.
2. Diseñar e incorporar la ambientación visual definitiva de la cabaña.
3. Sustituir progresivamente los botones y elementos provisionales de la escena por ilustraciones y objetos visuales interactivos.
4. Añadir, cuando corresponda, estados visuales, animaciones y efectos que den respuesta a las interacciones.
5. Adaptar la presentación del currículum, la cabaña y sus interfaces a pantallas pequeñas.

### 7.3. Mantenimiento

1. Corregir errores que aparezcan durante el desarrollo y evitar regresiones en las funcionalidades existentes.
2. Revisar y mejorar la organización y legibilidad del código cuando sea necesario, sin alterar comportamientos ya establecidos.


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
- Cada vez que se modifique, añada o sustituya código, mostrar también en la conversación el fragmento exacto afectado para que el usuario pueda revisar visualmente el cambio.
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

## Reorganización de escenas (noviembre de 2026)

- `index.html` conserva la estructura general: menú, interfaz de exploración, controles globales, inventario y panel del CV.
- `escenas/cabana.html` contiene las cuatro perspectivas de la cabañita y las cuatro del exterior. No se separan en archivos individuales por ahora.
- `js/cargar-escena.js` solicita `escenas/cabana.html` mediante `fetch`, inserta el contenido en `#contenido-escena` y después carga, en orden, `inventory.js`, `puzzles.js`, `navigation.js` y `main.js`. Así los módulos encuentran los elementos de la escena al registrar sus eventos.
- `navigation.js` conserva los identificadores de las ocho perspectivas y la lógica de giro. `main.js` conserva la coordinación y los eventos actuales; el cargador asegura que se ejecute después de insertar la escena.
- La carga mediante `fetch` requiere abrir el proyecto desde un servidor HTTP local (por ejemplo, Live Server en VS Code). No funcionará abriendo `index.html` directamente con `file://`.
- La casa grande se añadirá más adelante en `escenas/mansion.html`. Si su tamaño lo justifica, se podrán dividir sus zonas en archivos adicionales.
- Para la entrega al profesor se prevé incluir un `LEEME.txt` con instrucciones claras y valorar GitHub Pages para que pueda probar el proyecto desde un navegador. El proyecto seguirá sin dependencias externas ni instalaciones adicionales.
- Si falla la carga, el cargador muestra un aviso que indica que debe utilizarse un servidor local y registra el error técnico en la consola.

### Estado de la reorganización

- [x] Extraer las ocho perspectivas actuales a `escenas/cabana.html`.
- [x] Mantener en `index.html` el contenedor de escena y los controles globales.
- [x] Cargar la escena antes de ejecutar los módulos que dependen de sus elementos.
- [x] Comprobar en navegador mediante Live Server la carga, la navegación entre perspectivas, la salida y el regreso, la apertura del cajón y el funcionamiento del inventario y las piezas del CV (confirmado por el usuario el 4 de noviembre de 2026).
- [ ] Crear `escenas/mansion.html` al comenzar el diseño de la casa grande.


## 6. Corrección de interacción contextual y puzle de caballos (4 de noviembre de 2026)

- `#mensaje-escena` se encuentra fuera de las perspectivas individuales, pero dentro de `#escena`; se presenta como una capa común en la parte inferior y no intercepta clics.
- Al cambiar de perspectiva o de zona se limpia el mensaje contextual y se cancela cualquier selección de caballo activa.
- Pulsar de nuevo el mismo caballo lo deselecciona. Pulsar cualquier otro punto de `#escena` también cancela la selección, mientras que pulsar otro slot conserva la lógica de movimiento e intercambio.
- El caballito dorado comienza en el slot izquierdo.
- El buzón tiene prioridad de apilamiento y las referencias exteriores no interceptan eventos de puntero. Sigue siendo obligatorio tener equipada la llave de hierro.
- El sistema general de inventario conserva su funcionamiento; los objetos agotados se atenúan y ya no ofrecen la acción de equipar.

- Corrección acordada el 4 de noviembre de 2026: los slots interactivos del puzle de caballos quedan fuera del contenedor decorativo `.arte-pared` para evitar que `pointer-events: none` bloquee sus clics. El caballito dorado comienza en el slot izquierdo.
- Al abrir el buzón con la llave de hierro, esta queda marcada como agotada y desequipada; el caballito plateado aparece como objeto suelto en el suelo y solo pasa al inventario cuando se pulsa expresamente.
- Al abrir el cajón con la llave de latón, esta también queda marcada como agotada y desequipada. Las llaves permanecen visibles en el inventario, atenuadas, y no se pueden reutilizar.
- La lógica de selección, movimiento e intercambio de caballos se conserva sin cambios.

## Mejora visual de puertas, edificios y equipamiento (4 de noviembre de 2026)

- La ranura `#ranura-equipada` ahora tiene un estado hover con cambio de fondo, borde dorado claro y resplandor, manteniendo su tooltip.
- La pared trasera interior incluye una puerta dibujada con CSS y el botón «Salir al exterior» superpuesto. Se conserva el ID `#puerta-salida-cabana`, por lo que continúa utilizando el evento de navegación existente.
- En la vista exterior trasera, el botón «Volver a la cabañita» se coloca sobre la puerta dibujada de la cabaña. Se conserva el ID `#puerta-regreso-cabana`.
- La pared derecha interior incorpora una miniatura CSS de la mansión en el extremo izquierdo y otra de la cabañita en el extremo derecho. Se mantienen libres las posiciones centrales reservadas para el puzle de los trofeos.
- Todo el arte añadido está construido con HTML y CSS, sin imágenes, recursos externos ni dependencias. No se ha modificado ningún archivo JavaScript ni la posición o lógica del puzle de los caballos.

### Ajustes de acabado visual de puertas y miniaturas (4 de noviembre de 2026)

- La puerta interior de la pared trasera ahora tiene geometría rectangular: marco, hoja y paneles con esquinas rectas, sin sombras exteriores ni interiores.
- Se eliminaron los resplandores del pomo y cualquier efecto de opacidad de las miniaturas decorativas.
- La mini mansión y la minicabañita se sitúan en las esquinas superiores de la pared de trofeos. La mansión aumenta a 128 × 94 px y la cabañita se reduce a 84 × 62 px.
- Los botones de salida y regreso se desplazan hacia la parte superior de sus respectivas puertas. Se conservan sus identificadores y la navegación existente.
- Se mantiene sin cambios el hover de `#ranura-equipada`.
- No se modifica HTML, JavaScript, navegación, inventario ni el puzle de los caballos.

### Colores planos y organización del CSS art (4 de noviembre de 2026)

- Se eliminaron los degradados de la puerta interior y de las miniaturas de la mansión y la cabañita; sus superficies usan ahora colores sólidos.
- Los bordes de los paneles de la puerta también usan un color opaco uniforme.
- El bloque CSS de puertas y edificios decorativos se trasladó junto a «Arte provisional CSS de las perspectivas», en lugar de quedar al final de la hoja de estilos.
- Se mantienen las posiciones, dimensiones y botones de navegación. No se modifica HTML ni JavaScript, ni el hover de la ranura equipada o el puzle de los caballos.


## Mansión y puzle del cuervo — implementación inicial (4 de noviembre de 2026)

- Se crea `escenas/mansion.html` con cuatro perspectivas exteriores: Recibidor, Bosque derecho, Detrás y Bosque izquierdo. El interior de la mansión no es accesible.
- `js/cargar-escena.js` carga las escenas de la cabañita y la mansión en el contenedor compartido antes de iniciar los módulos.
- `js/navigation.js` añade la zona Mansión. Se entra desde Frente · Mansión y se vuelve al exterior desde Detrás.
- La vista frontal exterior muestra referencias del esqueleto de cabra a la izquierda y de la caseta de perro a la derecha.
- El recibidor incluye el porche, tejadillo, nido/cuervo y cuenco del perro. El bosque izquierdo muestra el cadáver de cabra en un cepo; el derecho, una caseta vacía; detrás se ve la cabañita y el buzón.
- El saco de pienso se coloca junto a la mesita de la pared izquierda de la cabañita. El cuervo deja caer una llave de cobre al recibir pienso en el cuenco; la llave se recoge del suelo y abre el cofre del escritorio, que contiene la Pieza 1 del CV.
- Se renombra el antiguo cajón como «Cofre cerrado». La llave de cobre ya no aparece en la cabañita: solo se obtiene cuando el cuervo la deja caer en el recibidor. El cadáver/cráneo de cabra es por ahora decorativo; su interacción se reserva para el puzle de trofeos.
- Pendiente de prueba manual de navegación, recogida del pienso, alimentación, recogida de la llave y apertura del cofre.
