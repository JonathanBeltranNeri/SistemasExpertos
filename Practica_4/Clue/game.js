// ===================================
// ARCHIVO DE LÓGICA (game.js)
// Controla toda la interactividad.
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Variables Globales del Juego ---
    let solucionSecreta = null; 
    let puntosInvestigacion = 10;
    let juegoTerminado = false;

    // --- Referencias a elementos del DOM ---
    const locationsGrid = document.getElementById('locations-grid');
    const suspectsGrid = document.getElementById('suspects-grid');
    const weaponsGrid = document.getElementById('weapons-grid');

    const notebookSuspects = document.getElementById('notebook-suspects');
    const notebookWeapons = document.getElementById('notebook-weapons');
    const notebookLocations = document.getElementById('notebook-locations');

    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    const piCountElement = document.getElementById('pi-count');
    const gameMessageElement = document.getElementById('game-message');

    // --- INICIO ETAPA 4: Referencias al Modal ---
    const openModalBtn = document.getElementById('final-accusation-btn');
    const closeModalBtn = document.getElementById('cancel-accusation-btn');
    const confirmAccusationBtn = document.getElementById('confirm-accusation-btn');
    const accusationModal = document.getElementById('accusation-modal');

    const suspectSelect = document.getElementById('suspect-select');
    const weaponSelect = document.getElementById('weapon-select');
    const locationSelect = document.getElementById('location-select');

    // --- INICIO ETAPA 4: Referencias al contenido principal para ocultarlo ---
    const headerElement = document.querySelector('header');
    const contentWrapper = document.querySelector('.content-wrapper');
    // --- FIN ETAPA 4 ---


    // ==================================
    // ETAPA 2: Carga de Datos y Pestañas
    // ==================================

    function crearTarjetas(lista, contenedor) {
        contenedor.innerHTML = '';
        for (const item of lista) {
            const card = document.createElement('div');
            card.className = 'card';
            card.textContent = item;
            card.dataset.item = item; 
            contenedor.appendChild(card);
        }
    }

    function crearCuaderno(lista, contenedor) {
        contenedor.innerHTML = '';
        for (const item of lista) {
            const li = document.createElement('li');
            li.innerHTML = `<label><input type="checkbox"> ${item}</label>`;
            contenedor.appendChild(li);
        }
    }

    // (Los datos como 'LISTA_SOSPECHOSOS' vienen de data.js)
    crearTarjetas(LISTA_LOCACIONES, locationsGrid);
    crearTarjetas(LISTA_SOSPECHOSOS, suspectsGrid);
    crearTarjetas(LISTA_ARMAS, weaponsGrid);

    crearCuaderno(LISTA_SOSPECHOSOS, notebookSuspects);
    crearCuaderno(LISTA_ARMAS, notebookWeapons);
    crearCuaderno(LISTA_LOCACIONES, notebookLocations);

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (juegoTerminado) return; // No permitir cambiar de pestaña si el juego acabó
            
            tabLinks.forEach(l => l.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            link.classList.add('active');
            const activePane = document.getElementById(link.dataset.tab);
            activePane.classList.add('active');
        });
    });


    // ==================================
    // ETAPA 3: Motor del Juego
    // ==================================

    function iniciarPartida() {
        // 1. Elegir una solución secreta al azar
        // (HISTORIAS_SECRETAS viene de data.js)
        solucionSecreta = HISTORIAS_SECRETAS[Math.floor(Math.random() * HISTORIAS_SECRETAS.length)];
        
        // DEBUG: Muestra la solución en la consola para hacer pruebas
        console.log("La solución secreta es:", solucionSecreta); 

        // 2. Reiniciar variables
        puntosInvestigacion = 10;
        juegoTerminado = false;

        // 3. Actualizar UI
        piCountElement.textContent = `${puntosInvestigacion} Puntos de Investigación`;
        gameMessageElement.textContent = "La nave está en cuarentena. Encuentre al culpable.";
    }

    function investigarItem(evento) {
        // Si el juego terminó o la tarjeta ya fue revelada, no hacer nada
        if (juegoTerminado || 
            evento.target.classList.contains('card-discarded') ||
            evento.target.classList.contains('card-suspicious')) {
            return;
        }

        // 1. Restar 1 PI
        puntosInvestigacion--;
        piCountElement.textContent = `${puntosInvestigacion} Puntos de Investigación`;

        // 2. Obtener el item de la tarjeta (ej: "Dra. Halsey")
        const itemSeleccionado = evento.target.dataset.item;

        // 3. Comparar con la solución secreta
        let esParteDeLaSolucion = (
            itemSeleccionado === solucionSecreta.culpable ||
            itemSeleccionado === solucionSecreta.arma ||
            itemSeleccionado === solucionSecreta.locacion
        );

        if (esParteDeLaSolucion) {
            // ¡Pista sospechosa!
            gameMessageElement.textContent = `PISTA: Actividad inusual detectada... [${itemSeleccionado}] NO SE PUEDE DESCARTAR.`;
            evento.target.classList.add('card-suspicious'); // Añade clase "sospechosa"
        } else {
            // Pista de descarte
            gameMessageElement.textContent = `PISTA: Coartada confirmada. [${itemSeleccionado}] ha sido DESCARTADO.`;
            evento.target.classList.add('card-discarded'); // Añade clase "descartada"
        }

        // 5. Comprobar si se acabaron los PI
        if (puntosInvestigacion <= 0) {
            terminarPartida(false); // El jugador pierde por quedarse sin PI
        }
    }

    function terminarPartida(haGanado) {
        juegoTerminado = true;
        
        // Ocultamos la interfaz principal del juego
        contentWrapper.style.display = 'none';

        // Preparamos el mensaje final
        let resultadoTitulo = haGanado ? "¡CASO RESUELTO!" : "CASO FALLIDO";
        
        // Mostramos si el jugador falló por PI
        let motivoFallo = (puntosInvestigacion <= 0 && !haGanado) 
            ? "<p>Te has quedado sin Puntos de Investigación.</p>" 
            : "<p>Tu acusación fue incorrecta.</p>";
        
        if(haGanado) motivoFallo = "<p>Tu acusación fue correcta.</p>";

        let mensajeFinal = `
            <div class="final-narrative">
                <h2>${resultadoTitulo}</h2>
                ${motivoFallo}
                <p>La verdad detrás del asesinato de la Almirante Osman era:</p>
                <div class="narrative-box">
                    <p><strong>Culpable:</strong> ${solucionSecreta.culpable}</p>
                    <p><strong>Arma:</strong> ${solucionSecreta.arma}</p>
                    <p><strong>Locación:</strong> ${solucionSecreta.locacion}</p>
                    <hr>
                    <p><strong>Narrativa:</strong> ${solucionSecreta.narrativa}</p>
                </div>
                </div>
        `;
        
        // Actualizamos el encabezado y mostramos el resultado
        headerElement.innerHTML = `<h1>UNSC // Caso Clasificado // INFORME FINAL</h1>`;
        headerElement.insertAdjacentHTML('afterend', mensajeFinal);
    }

    // Añadir 'escuchadores' de clics a TODAS las tarjetas (usando delegación de eventos)
    // Esto es más eficiente que añadir un listener a cada tarjeta
    document.querySelector('.main-content').addEventListener('click', (evento) => {
        if (evento.target.classList.contains('card')) {
            investigarItem(evento);
        }
    });


    // ==================================
    // ETAPA 4: Lógica del Modal
    // ==================================

    function poblarSelect(selectElement, lista) {
        selectElement.innerHTML = ''; 
        for (const item of lista) {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            selectElement.appendChild(option);
        }
    }

    function abrirModalAcusacion() {
        if (juegoTerminado) return;
        poblarSelect(suspectSelect, LISTA_SOSPECHOSOS);
        poblarSelect(weaponSelect, LISTA_ARMAS);
        poblarSelect(locationSelect, LISTA_LOCACIONES);
        accusationModal.classList.add('active'); // Muestra el modal
    }

    function cerrarModalAcusacion() {
        accusationModal.classList.remove('active'); // Oculta el modal
    }

    function procesarAcusacion() {
        // 1. Obtener los valores seleccionados
        const culpableElegido = suspectSelect.value;
        const armaElegida = weaponSelect.value;
        const locacionElegida = locationSelect.value;

        // 2. Comparar con la solución secreta
        const haGanado = (
            culpableElegido === solucionSecreta.culpable &&
            armaElegida === solucionSecreta.arma &&
            locacionElegida === solucionSecreta.locacion
        );

        // 3. Cerrar el modal y terminar la partida
        cerrarModalAcusacion();
        terminarPartida(haGanado);
    }

    // --- Añadir 'escuchadores' a los botones del modal ---
    openModalBtn.addEventListener('click', abrirModalAcusacion);
    closeModalBtn.addEventListener('click', cerrarModalAcusacion);
    confirmAccusationBtn.addEventListener('click', procesarAcusacion);

    // --- Iniciar la partida ---
    iniciarPartida();

});