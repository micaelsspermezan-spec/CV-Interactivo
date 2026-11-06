# CV-Interactivo — Estado del proyecto

> **Documento principal vigente.** Esta es la referencia actual para conocer la estructura, el funcionamiento, las decisiones y las tareas pendientes del proyecto. Trabajar siempre con este archivo salvo que aquí se indique expresamente otro documento.

Si el historial de cambios crece hasta dificultar la consulta del estado actual, se trasladarán las entradas antiguas a \`HISTORIAL_PROYECTO.md\`. Este documento seguirá siendo el punto de entrada y señalará claramente dónde está el historial. No se crearán versiones numeradas como \`ESTADO_PROYECTO1.md\`, \`ESTADO_PROYECTO2.md\`, etc., para evitar dudas sobre cuál está vigente.

## 1. Descripción y tecnologías

CV interactivo desarrollado como una aventura de exploración point-and-click. El visitante recorre una cabañita, sus exteriores y la zona exterior de una mansión; recoge objetos, resuelve mecanismos y desbloquea partes del currículum.

El proyecto utiliza HTML, CSS y JavaScript vanilla. Los escenarios y sus elementos visuales se construyen principalmente con HTML y CSS. No se utilizan bibliotecas, dependencias, imágenes ni servicios externos para las escenas actuales.

El trabajo se realiza desde Visual Studio Code y el repositorio oficial es \`micaelsspermezan-spec/CV-Interactivo\`. La rama de trabajo habitual es \`main\`.

## 2. Estado actual del proyecto

### Escenarios y navegación

- **Cabañita:** cuatro paredes interiores. La frontal contiene el escritorio, el cofre y elementos del CV; la izquierda contiene el puzle de los caballos; la trasera tiene la puerta de salida; la derecha contiene el puzle de los trofeos.
- **Exterior de la cabañita:** cuatro perspectivas conectadas entre sí. Desde la vista frontal se accede a la zona exterior de la mansión.
- **Mansión:** cuatro perspectivas exteriores: Recibidor, Bosque izquierdo, Bosque derecho y Detrás. El interior de la mansión no es accesible en esta versión.
- La navegación se realiza mediante flechas entre perspectivas y zonas de clic sobre puertas y edificios. Las zonas de clic conservan sus identificadores y están separadas del arte decorativo.

### Objetos, inventario y mecanismos

- El inventario almacena los objetos recogidos durante la partida. Los objetos agotados permanecen visibles, pero atenuados y sin posibilidad de volver a equiparse.
- Existe una única ranura de equipamiento. Los objetos utilizables pueden equiparse desde su ficha; si la ranura está vacía, algunos objetos se equipan automáticamente al recogerlos.
- El puzle del cuervo permite obtener la llave de cobre al colocar pienso en el cuenco del perro. La llave abre el cofre del escritorio y permite conseguir la Pieza 1 del CV.
- El puzle de los caballos requiere abrir el buzón con la llave de hierro, recoger y colocar el caballito plateado y dejar los dos caballos mirándose frente a frente. Al resolverlo aparece la Pieza 2.
- El puzle de los trofeos consiste en ordenar los cráneos de cabra, ciervo y alce según la pista de los árboles del bosque izquierdo. Al resolverlo aparece la Pieza 3. La versión actual utiliza tres posiciones y tres trofeos.
- Las piezas del CV se agrupan en el inventario y pueden consultarse. El panel del currículum mantiene visible su cabecera personal y revela los tres fragmentos al conseguir las piezas correspondientes.
- Al recoger todas las piezas disponibles aparece un aviso de finalización compacto y ligeramente translúcido durante tres segundos, con entrada y salida gradual. Se muestra una sola vez por partida y no bloquea la interacción.

### Límites conocidos y alcance de esta versión

- El inventario, los objetos y el progreso se mantienen en memoria JavaScript. Recargar la página reinicia la partida; no hay guardado persistente.
- No se desarrollará el interior de la mansión ni se añadirán más objetos o puzles para cerrar esta versión.
- Hay animaciones CSS puntuales, como el desplazamiento del cuervo y la caída de la llave. No existe un sistema general de audio ni de animación compleja.
- La adaptación a pantallas pequeñas tiene reglas CSS básicas; deberá revisarse durante las pruebas finales.
- El estado descrito corresponde al código de la rama \`main\`. No se debe asumir que una copia local de VS Code está sincronizada con GitHub.

## 3. Estructura del repositorio

\`\`\`text
CV-Interactivo/
├── index.html
│   └── Interfaz general: menú, exploración, controles, inventario y panel del CV.
├── escenas/
│   ├── cabana.html
│   │   └── Cuatro paredes interiores y cuatro perspectivas del exterior de la cabañita.
│   └── mansion.html
│       └── Cuatro perspectivas exteriores de la mansión.
├── css/
│   └── style.css
│       ├── Variables, pantallas, menú, botones, cabecera y escena.
│       ├── Inventario, currículum, equipamiento y avisos.
│       ├── Objetos interactivos, caballos, trofeos y piezas del CV.
│       ├── Paredes interiores y elementos propios de la cabañita.
│       ├── Edificios, árboles, exteriores y mansión.
│       └── Adaptación a pantallas pequeñas y mensajes de escena.
├── js/
│   ├── cargar-escena.js
│   │   └── Carga el HTML de la escena y después los módulos JavaScript.
│   ├── inventory.js
│   │   └── Datos del inventario, recogida, fichas, selección y equipamiento.
│   ├── puzzles.js
│   │   └── Lógica del cofre, cuervo, buzón, caballos y trofeos.
│   ├── navigation.js
│   │   └── Perspectivas, cambios de zona y navegación entre escenarios.
│   └── main.js
│       └── Coordinación de la interfaz, eventos generales y elementos de escena.
└── ESTADO_PROYECTO.md
    └── Documento principal de referencia, normas, estado e historial.
\`\`\`

### Responsabilidad de los archivos

- \`index.html\` conserva la estructura general de la aplicación y los paneles globales.
- \`escenas/cabana.html\` y \`escenas/mansion.html\` contienen el marcado de sus respectivas perspectivas.
- \`css/style.css\` concentra los estilos de interfaz y el arte de los escenarios. Mantiene bloques temáticos para que las reglas relacionadas estén juntas.
- \`inventory.js\` administra los objetos, sus datos, la selección, las fichas y el equipamiento.
- \`puzzles.js\` contiene las condiciones y las interacciones de los mecanismos.
- \`navigation.js\` administra las perspectivas y las transiciones entre las tres zonas.
- \`main.js\` conecta los eventos de la interfaz y coordina las interacciones generales.
- \`cargar-escena.js\` inserta el HTML externo antes de cargar los módulos que necesitan consultar sus elementos.

## 4. Carga y ejecución

Las escenas HTML se insertan en el contenedor \`#contenido-escena\` mediante \`fetch\`. Después de insertar el marcado, el cargador incorpora secuencialmente los módulos JavaScript para que sus identificadores y elementos ya existan al registrar los eventos.

Por este motivo, el proyecto debe abrirse mediante un servidor HTTP local, por ejemplo **Live Server** en VS Code. Abrir \`index.html\` directamente con \`file://\` no permite cargar correctamente las escenas externas.

La entrega deberá incluir instrucciones claras en un archivo \`LEEME.txt\`, una copia completa del código fuente y, si se considera conveniente, una versión publicada mediante GitHub Pages. No se instalarán dependencias ni se configurarán servicios externos sin explicarlo y acordarlo antes.

## 5. Decisiones que se deben mantener

- Trabajar en la rama \`main\`, salvo indicación expresa en contrario.
- Mantener la separación entre interfaz general, escenas, estilos, inventario, puzles y navegación.
- No dividir cada perspectiva en un archivo independiente salvo que el tamaño del proyecto lo justifique.
- Mantener la mansión como zona exterior explorable; su interior queda fuera del alcance de esta entrega.
- No incorporar guardado persistente, nuevos puzles ni nuevos objetos como requisito de cierre.
- Mantener los identificadores de los elementos interactivos cuando se rediseñe su aspecto, salvo que se revise también su lógica y se acuerde el cambio.
- Priorizar HTML y CSS comprensibles, con estilos agrupados por función y comentarios útiles.
- El currículum debe poder consultarse sin obligar al visitante a resolver todos los puzles.
- Las piezas del CV revelan sus fragmentos correspondientes y permanecen disponibles para consulta en el inventario.

## 6. Objetivos pendientes

### Cierre de la versión actual

1. Continuar puliendo el aspecto visual de escenarios, objetos e interfaz.
2. Revisar la legibilidad y organización de CSS, JavaScript y HTML sin cambiar comportamientos establecidos.
3. Comprobar en navegador las cuatro paredes, las ocho perspectivas exteriores, las transiciones, los objetos, los puzles, el inventario y el currículum.
4. Revisar la adaptación a móviles y pantallas pequeñas.
5. Preparar \`LEEME.txt\`, la copia del código fuente y valorar GitHub Pages para facilitar la revisión del profesor.

No se considera necesario implementar guardado persistente ni ampliar el contenido jugable para entregar esta versión.

### Posibles ampliaciones futuras

Solo si se decide ampliar el proyecto después de la entrega: nuevas piezas del CV y puzles, nuevas zonas, más perspectivas, nuevas mecánicas, mejoras de audio y animación o guardado persistente.

## 7. Normas de trabajo y transparencia

### Antes de modificar código

- Consultar el estado actual de \`main\` y leer la versión vigente de todos los archivos que se vayan a tocar.
- Explicar qué archivo y sección se modificarán, qué cambio se propone y qué efecto se espera.
- Esperar la aprobación del usuario antes de modificar código. Si hay alternativas de diseño relevantes, explicarlas primero.
- No pedir código que ya esté disponible en el repositorio.

### Seguridad y calidad

- No añadir código oculto, ofuscado o innecesariamente complejo.
- No introducir telemetría, analítica, recopilación o envío de datos, conexiones externas, dependencias, scripts de terceros ni servicios sin explicarlo y obtener aprobación explícita.
- Explicar previamente cualquier uso nuevo de \`fetch\`, solicitudes HTTP, almacenamiento local, cookies, APIs externas o carga dinámica de scripts.
- Mantener el código legible, modular y comentado. No afirmar que se ha auditado exhaustivamente ni que es completamente seguro.

### Después de cada modificación

- Indicar los archivos y las secciones modificadas, explicar el efecto y mostrar el fragmento exacto afectado cuando ayude a revisar el cambio.
- Verificar recuperando desde GitHub el contenido guardado en la rama \`main\`.
- Diferenciar claramente una revisión del código de una prueba funcional realizada en navegador.
- Indicar si hace falta ejecutar \`git pull\` en VS Code. No asumir que la copia local y GitHub están sincronizados.
- No encadenar cambios adicionales que no se hayan acordado.

### Flujo básico de Git

Para publicar cambios realizados en local:

\`\`\`bash
git status
git add .
git commit -m "Descripción breve del cambio"
git push
\`\`\`

Para traer a VS Code cambios ya guardados en GitHub:

\`\`\`bash
git pull
\`\`\`

No editar simultáneamente el mismo archivo en local y directamente en GitHub sin sincronizar después.

## 8. Historial de cambios

El historial se agrupa por fecha. Cada fecha debe tener un único encabezado; las distintas tareas realizadas ese día se documentan como apartados dentro de ese bloque.

### 4 de noviembre de 2026

- **Interacción y puzle de los caballos:** se corrigió la selección contextual. Pulsar el mismo caballo permite deseleccionarlo y pulsar fuera de los slots cancela la selección. Los mensajes se limpian al cambiar de perspectiva o zona. Se corrigió la prioridad de capas del buzón y se mantuvo la llave de hierro como requisito.
- **Llaves y objetos agotados:** al abrir el buzón o el cofre, la llave correspondiente queda agotada y desequipada; permanece visible, atenuada y no puede reutilizarse. El caballito plateado aparece en el suelo y se recoge con un clic independiente.
- **Puertas, miniaturas y equipamiento:** se dibujaron con CSS la puerta de salida de la cabañita y las miniaturas de la mansión y la cabañita en la pared de trofeos. Se ajustaron sus posiciones y proporciones, se eliminaron degradados y se mantuvieron los IDs y eventos existentes.
- **Mansión y puzle del cuervo:** se incorporó \`escenas/mansion.html\` con cuatro perspectivas exteriores. Se conectó la navegación entre cabañita, exterior y mansión. El recibidor contiene el nido y el cuervo; el bosque izquierdo, los restos de cabra y el cepo; el derecho, la caseta; y la vista trasera, la cabañita y el buzón. Se estableció la secuencia de alimentar al cuervo, recoger la llave de cobre y abrir el cofre para conseguir la Pieza 1.

### 5 de noviembre de 2026

- **Proporciones de edificios:** la mansión exterior y la cabañita trasera se organizaron en contenedores propios para que techo, cuerpo y puerta mantengan sus proporciones al cambiar el tamaño de la escena. Las miniaturas siguen el mismo principio.
- **Organización CSS:** se agruparon los estilos de edificios y elementos asociados. El cambio fue de estructura y presentación del código, sin modificar la lógica JavaScript ni la navegación.

### 6 de noviembre de 2026

- **Rediseño del currículum:** nueva presentación editorial en tono marfil dentro del panel oscuro. Se reorganizaron la identidad y los datos de contacto, el perfil personal, la formación, la experiencia, los idiomas, las competencias y los intereses. Se mantiene el desbloqueo progresivo de los tres fragmentos y no se modifica la lógica de inventario ni de puzles.

- **Paredes interiores:** las paredes interiores 2, 3 y 4 adoptaron madera marrón plana, marco negro y juntas decorativas. La mesa de la pared izquierda reutiliza el estilo del escritorio. La puerta trasera se amplió hasta la base de la escena.
- **Elementos de la cabañita y recibidor:** la llave de cobre reutiliza la silueta CSS de la llave de hierro con color cobrizo. Se añadió una viñeta oscura a las perspectivas interiores y al recibidor. El saco de pienso se redibujó con CSS y contorno negro.
- **Exteriores de la mansión:** las cuatro perspectivas reutilizan el fondo ultramarino casi negro y la viñeta de iluminación, manteniendo sus objetos e interacciones.
- **Cráneos de trofeo:** los emojis se sustituyeron por cráneos dibujados con HTML y CSS, con hueso marfil, rasgos negros y cornamentas diferenciadas. Se ajustaron las proporciones del ciervo y del alce; una corrección posterior del alce se revirtió por no resultar satisfactoria.
- **Recibidor y cuervo:** se rediseñó la fachada con tejado a dos aguas, ventanas de cuatro cristales, puerta central, pilares, nido y cuenco. Se corrigió la orientación del pico. Al alimentar al cuervo, este se desplaza al cuenco, desaparece la llave decorativa y cae una llave recogible desde el nido.
- **Piezas del CV y zonas de clic:** las piezas visibles en escena adoptaron aspecto de pequeños papeles con líneas simuladas. Se ampliaron las zonas transparentes de puertas y edificios para facilitar la navegación y se añadió un realce de brillo sobre el edificio correspondiente al pasar el puntero.
- **Árboles:** se organizaron cuatro modelos CSS independientes: genérico, calvo, mediano y frondoso. Los tres modelos especiales se reservan para el bosque izquierdo; los árboles genéricos decoran las vistas exteriores previstas.
- **Reorganización y limpieza de CSS:** se agruparon los estilos generales, inventario, objetos interactivos, paredes interiores, edificios, árboles y exteriores. Se mantuvo la adaptación a pantallas pequeñas al final. Después se eliminaron declaraciones repetidas del escritorio de la pared izquierda, de los slots de caballos y del panel inferior de la puerta.
- **Limpieza de edificios y estilos móviles:** las dimensiones y el tipo de contenedor de la mansión y la cabañita se consolidaron en sus reglas principales. El desplazamiento móvil del cuenco del perro se integró en el bloque general de adaptación a pantallas pequeñas. Se conservaron los valores efectivos y el comportamiento visual.
- **Documento de estado:** se reorganizó este archivo para que refleje el código actual, reúna los cambios por fecha y mantenga un único documento principal de referencia.
- **Rediseño exterior de la cabañita:** se renovaron la silueta del tejado, las proporciones de fachada y puerta, los detalles de ventanas y molduras y la paleta para armonizarla con el interior y el porche de la mansión. El cráneo de alce recogible se centró sobre la entrada. Se mantuvieron separados la miniatura de la mansión y sus elementos, así como los identificadores de interacción.
- **Miniatura de la cabañita en la vista trasera de la mansión:** se sustituyó el dibujo antiguo por una versión reducida del diseño exterior actual, con tejado a dos aguas, fachada lisa, moldura y puerta central. Se conservó el buzón y la zona de clic para volver al exterior.
- **Recibidor de la mansión:** se amplió la fachada poligonal hasta el tejado a dos aguas y se añadió detrás una franja rectangular de fachada que rebasa los pilares para dar continuidad a los laterales de las ventanas. Se centraron la llave decorativa y el cuervo sobre el nido; el estado alimentado del cuervo conserva su desplazamiento hacia el cuenco.
- **Fachada exterior de la mansión:** se sustituyó el tejado redondeado y la fachada antigua por una versión reducida del diseño del recibidor: tejado a dos aguas, fachada de madera rojiza, cuatro ventanas con cuarterones, pilares, molduras y puerta central. Se redujeron ligeramente las dimensiones del edificio y se ajustó a ellas la zona transparente de entrada; se conservaron el esqueleto de cabra, la caseta, los árboles y el identificador de navegación. Después se corrigieron las ventanas: se integraron como elementos hijos de la fachada para que queden dentro de su capa de dibujo y del recorte poligonal, con cristales oscuros, marcos de madera y cuarterones. Se simplificó el dibujo de la fachada y se ajustó el tejado para que solape la estructura y no deje huecos.
- **Fondo del currículum:** se sustituyó el marfil claro por una paleta de pergamino envejecido, con tonos arena tostados, variaciones sutiles de color y textura construida con degradados CSS. Se adaptaron bordes, separadores, tarjetas y etiquetas a tonos sepia y tierra, manteniendo el contraste del texto y sin añadir imágenes ni recursos externos.
- **Aviso de finalización y emblema de la mansión:** el aviso del currículum se redujo de cuatro a tres segundos y ahora se desvanece durante los últimos 450 ms. El emblema SVG de dos caballos enfrentados se colocó en el recibidor de la mansión, grabado visualmente dentro de la hoja de la puerta; se retiró de la fachada exterior de la cabañita. No se añadieron imágenes externas ni dependencias.
