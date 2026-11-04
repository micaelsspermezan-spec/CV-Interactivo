/* Carga la escena inicial antes de ejecutar los módulos de la aplicación. */
async function cargarEscenaInicial() {
    const contenedor = document.getElementById('contenido-escena');
    try {
        const respuesta = await fetch('escenas/cabana.html');
        if (!respuesta.ok) throw new Error('No se pudo cargar la escena: ' + respuesta.status);
        contenedor.innerHTML = await respuesta.text();
        const scripts = ['js/inventory.js', 'js/puzzles.js', 'js/navigation.js', 'js/main.js'];
        for (const ruta of scripts) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = ruta;
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