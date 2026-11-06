/* Carga la escena inicial antes de ejecutar los módulos de la aplicación. */
async function cargarEscenaInicial() {
    const contenedor = document.getElementById('contenido-escena');
    try {
        const [respuestaCabana, respuestaMansion] = await Promise.all([
            fetch('escenas/cabana.html', { cache: 'no-store' }),
            fetch('escenas/mansion.html', { cache: 'no-store' })
        ]);
        if (!respuestaCabana.ok || !respuestaMansion.ok) {
            throw new Error('No se pudieron cargar las escenas: ' +
                respuestaCabana.status + ' / ' + respuestaMansion.status);
        }
        const [htmlCabana, htmlMansion] = await Promise.all([
            respuestaCabana.text(),
            respuestaMansion.text()
        ]);
        contenedor.innerHTML = htmlCabana + htmlMansion;
        const scripts = ['js/inventory.js', 'js/puzzles.js', 'js/navigation.js', 'js/main.js'];
        for (const ruta of scripts) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = ruta + '?v=' + Date.now();
                script.onload = resolve;
                script.onerror = () => reject(new Error('No se pudo cargar ' + ruta));
                document.body.appendChild(script);
            });
        }
    } catch (error) {
        console.error(error);
        contenedor.textContent = 'No se ha podido cargar la escena. Abre el proyecto mediante un servidor local, por ejemplo Live Server.';
    }
}
cargarEscenaInicial();