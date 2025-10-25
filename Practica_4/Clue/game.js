// ===================================
// ARCHIVO DE LÓGICA (game.js)
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Variables Globales del Juego ---
    let culpableSecreto = null;
    let armaSecreta = null;
    let locacionSecreta = null;
    let puntosInvestigacion = 10;
    let juegoTerminado = false;
    let itemBajoInvestigacion = null;
    let tarjetaBajoInvestigacion = null;
    let episodioActual = null;
    let pistasDelEpisodio = null;

    // --- Referencias al DOM (Generales) ---
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
    const headerElement = document.querySelector('header');
    const contentWrapper = document.querySelector('.content-wrapper');

    // (Referencias a Modals)
    const welcomeModal = document.getElementById('welcome-modal');
    const startGameBtn = document.getElementById('start-game-btn');
    const welcomeStoryElement = document.getElementById('welcome-story');
    const welcomeTitle = welcomeModal ? welcomeModal.querySelector('h2') : null; // Añadir chequeo
    const mainTitle = headerElement ? headerElement.querySelector('h1') : null; // Añadir chequeo

    const accusationModal = document.getElementById('accusation-modal');
    const openModalBtn = document.getElementById('final-accusation-btn');
    const closeModalBtn = document.getElementById('cancel-accusation-btn');
    const confirmAccusationBtn = document.getElementById('confirm-accusation-btn');
    const suspectSelect = document.getElementById('suspect-select');
    const weaponSelect = document.getElementById('weapon-select');
    const locationSelect = document.getElementById('location-select');

    const clueModal = document.getElementById('clue-modal');
    const clueModalTitle = document.getElementById('clue-modal-title');
    const clueModalBody = document.getElementById('clue-modal-body');
    const clueModalCloseBtn = document.getElementById('clue-modal-close');

    // (Referencias a Sonidos)
    const audioClick = document.getElementById('audio-click');
    const audioDiscard = document.getElementById('audio-discard');
    const audioInvestigate = document.getElementById('audio-investigate');
    const audioBackground = document.getElementById('audio-background'); // Referencia a la música


    // --- FUNCIÓN DE PRE-INICIO ---
    function prepararBienvenida() {
        if (!welcomeModal || !welcomeTitle || !welcomeStoryElement) return; // Salir si falta algo
        const episodiosDisponibles = Object.keys(EPISODE_DATA);
        if (episodiosDisponibles.length === 0) {
             console.error("No hay episodios definidos en EPISODE_DATA.");
             return;
        }
        const episodioKey = episodiosDisponibles[Math.floor(Math.random() * episodiosDisponibles.length)];
        episodioActual = EPISODE_DATA[episodioKey];
        if (!episodioActual) {
             console.error(`Episodio "${episodioKey}" no encontrado en EPISODE_DATA.`);
             return;
        }
        pistasDelEpisodio = episodioActual.clues;
        welcomeTitle.textContent = `BRIEFING CLASIFICADO: ${episodioActual.victimName.toUpperCase()}`;
        welcomeStoryElement.innerHTML = `<p>${episodioActual.introStory}</p>`;
    }

    // --- FUNCIÓN PRINCIPAL DE INICIO DEL JUEGO ---
    function comenzarJuego() {
        if (welcomeModal) welcomeModal.classList.remove('active');
        if (mainTitle && episodioActual) mainTitle.textContent = `UNSC // Caso Clasificado: ${episodioActual.victimName.toUpperCase()}`;

        // Carga de tarjetas y cuaderno
        if (episodioActual) {
            crearTarjetas(episodioActual.suspects, suspectsGrid);
            crearCuaderno(episodioActual.suspects, notebookSuspects);
        }
        crearTarjetas(LISTA_ARMAS, weaponsGrid);
        crearCuaderno(LISTA_ARMAS, notebookWeapons);
        crearTarjetas(LISTA_LOCACIONES, locationsGrid);
        crearCuaderno(LISTA_LOCACIONES, notebookLocations);

        iniciarPartida();
        activarListeners();

        // Iniciar música de fondo
        if (audioBackground) {
            audioBackground.volume = 0.2; // Volumen bajo
            audioBackground.play().catch(error => {
                console.warn("Reproducción automática bloqueada por el navegador.", error);
            });
        }
    }

    // --- Funciones de Configuración ---
    function crearTarjetas(lista, contenedor) {
        if (!contenedor || !lista) return;
        contenedor.innerHTML = '';
        lista.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.textContent = item;
            card.dataset.item = item;
            contenedor.appendChild(card);
        });
    }
    function crearCuaderno(lista, contenedor) {
        if (!contenedor || !lista) return;
        contenedor.innerHTML = '';
        lista.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<label><input type="checkbox"> ${item}</label>`;
            contenedor.appendChild(li);
        });
    }

    // --- Motor de Inicio Aleatorio ---
    function iniciarPartida() {
        if (!episodioActual) return; // No iniciar si no hay episodio
        const elegirAlAzar = (lista) => lista[Math.floor(Math.random() * lista.length)];
        culpableSecreto = elegirAlAzar(episodioActual.suspects);
        armaSecreta = elegirAlAzar(LISTA_ARMAS);
        locacionSecreta = elegirAlAzar(LISTA_LOCACIONES);

        console.log("Solución Secreta del Episodio:", {
            culpable: culpableSecreto,
            arma: armaSecreta,
            locacion: locacionSecreta
        });

        puntosInvestigacion = 10;
        juegoTerminado = false;
        if (piCountElement) piCountElement.textContent = `${puntosInvestigacion} Puntos de Investigación`;
        if (gameMessageElement) gameMessageElement.textContent = "La nave está en cuarentena. Encuentre al culpable.";

        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('card-discarded', 'card-investigated');
        });
        document.querySelectorAll('.notebook input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
    }

    // --- Lógica de Investigación ---
    function investigarItem(evento) {
        if (juegoTerminado ||
            evento.target.classList.contains('card-discarded') ||
            evento.target.classList.contains('card-investigated')) {
            return;
        }
        try {
            if (audioClick) {
                audioClick.currentTime = 0;
                audioClick.play();
            }
        } catch(e) { console.error("Error al reproducir audio-click:", e); }

        itemBajoInvestigacion = evento.target.dataset.item;
        tarjetaBajoInvestigacion = evento.target;
        const pistaNarrativa = (pistasDelEpisodio && pistasDelEpisodio[itemBajoInvestigacion])
                               ? pistasDelEpisodio[itemBajoInvestigacion]
                               : "No se encontró el archivo de pista.";
        if (clueModalTitle) clueModalTitle.textContent = `Archivo de Pista: ${itemBajoInvestigacion}`;
        if (clueModalBody) clueModalBody.innerHTML = `<p>${pistaNarrativa}</p>`;
        if (clueModal) clueModal.classList.add('active');
    }

    function procesarInvestigacion() {
        if (clueModal) clueModal.classList.remove('active');
        puntosInvestigacion--;
        if (piCountElement) piCountElement.textContent = `${puntosInvestigacion} Puntos de Investigación`;
        const itemSeleccionado = itemBajoInvestigacion;
        let esParteDeLaSolucion = (
            itemSeleccionado === culpableSecreto ||
            itemSeleccionado === armaSecreta ||
            itemSeleccionado === locacionSecreta
        );

        if (esParteDeLaSolucion) {
            if (gameMessageElement) gameMessageElement.textContent = `ARCHIVO REVISADO. No se puede confirmar ni descartar [${itemSeleccionado}].`;
            if (tarjetaBajoInvestigacion) tarjetaBajoInvestigacion.classList.add('card-investigated');
            try {
                if (audioInvestigate) {
                    audioInvestigate.currentTime = 0;
                    audioInvestigate.play();
                }
            } catch(e) { console.error("Error al reproducir audio-investigate:", e); }
        } else {
            if (gameMessageElement) gameMessageElement.textContent = `PISTA: Coartada confirmada. [${itemSeleccionado}] ha sido DESCARTADO.`;
            if (tarjetaBajoInvestigacion) tarjetaBajoInvestigacion.classList.add('card-discarded');
            try {
                if (audioDiscard) {
                    audioDiscard.currentTime = 0;
                    audioDiscard.play();
                }
            } catch(e) { console.error("Error al reproducir audio-discard:", e); }
        }

        itemBajoInvestigacion = null;
        tarjetaBajoInvestigacion = null;
        if (puntosInvestigacion <= 0) {
            terminarPartida(false);
        }
    }

    // --- Lógica de Fin de Partida ---
    function terminarPartida(haGanado) {
        juegoTerminado = true;
        if (contentWrapper) contentWrapper.style.display = 'none';

        // Detener música de fondo al terminar
        if (audioBackground) {
            audioBackground.pause();
            audioBackground.currentTime = 0; // Reiniciar para la próxima vez
        }


        let resultadoTitulo = haGanado ? "¡CASO RESUELTO!" : "CASO FALLIDO";
        let motivoFallo = (puntosInvestigacion <= 0 && !haGanado)
            ? "<p>Te has quedado sin Puntos de Investigación.</p>"
            : "<p>Tu acusación fue incorrecta.</p>";
        if (haGanado) motivoFallo = "<p>Tu acusación fue correcta.</p>";

        // Asegurarse de que pistasDelEpisodio exista antes de usarlo
        const pistaCulpable = pistasDelEpisodio && pistasDelEpisodio[culpableSecreto] ? pistasDelEpisodio[culpableSecreto] : "Información no disponible.";
        const pistaArma = pistasDelEpisodio && pistasDelEpisodio[armaSecreta] ? pistasDelEpisodio[armaSecreta] : "Información no disponible.";
        const pistaLocacion = pistasDelEpisodio && pistasDelEpisodio[locacionSecreta] ? pistasDelEpisodio[locacionSecreta] : "Información no disponible.";


        let mensajeFinal = `
            <div class="final-narrative">
                <h2>${resultadoTitulo}</h2>
                ${motivoFallo}
                <p>La verdad detrás del asesinato de ${episodioActual ? episodioActual.victimName : 'la víctima'} era:</p>
                <div class="narrative-box">
                    <p><strong>Culpable:</strong> ${culpableSecreto || '???'}</p>
                    <p><strong>Arma:</strong> ${armaSecreta || '???'}</p>
                    <p><strong>Locación:</strong> ${locacionSecreta || '???'}</p>
                    <hr>
                    <h3>RECONSTRUCCIÓN DEL CRIMEN:</h3>
                    <p><strong>(El Culpable):</strong> ${pistaCulpable}</p>
                    <p><strong>(El Arma):</strong> ${pistaArma}</p>
                    <p><strong>(La Locación):</strong> ${pistaLocacion}</p>
                </div>
                 <button id="play-again-btn" class="btn-confirm">JUGAR DE NUEVO</button>
            </div>
        `;

        if (headerElement) {
            headerElement.innerHTML = `<h1>UNSC // Caso Clasificado // INFORME FINAL</h1>`;
            // Buscar si ya existe un 'final-narrative' para evitar duplicados
            const existingFinal = document.querySelector('.final-narrative');
            if (!existingFinal) {
                 headerElement.insertAdjacentHTML('afterend', mensajeFinal);
            } else {
                 // Si ya existe, simplemente actualiza el contenido (menos probable que ocurra)
                 existingFinal.innerHTML = mensajeFinal; // O alguna lógica de actualización más segura
            }


            const playAgainBtn = document.getElementById('play-again-btn');
            if (playAgainBtn) {
                // Remover listener anterior si existe para evitar duplicados
                playAgainBtn.replaceWith(playAgainBtn.cloneNode(true));
                document.getElementById('play-again-btn').addEventListener('click', () => location.reload()); // Recarga la página
            }
        }
    }


    // --- Lógica del Modal de Acusación ---
    function poblarSelect(selectElement, lista) {
        if (!selectElement || !lista) return;
        selectElement.innerHTML = '';
        lista.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            selectElement.appendChild(option);
        });
    }
    function abrirModalAcusacion() {
        if (juegoTerminado || !episodioActual) return;
        poblarSelect(suspectSelect, episodioActual.suspects);
        poblarSelect(weaponSelect, LISTA_ARMAS);
        poblarSelect(locationSelect, LISTA_LOCACIONES);
        if (accusationModal) accusationModal.classList.add('active');
    }
    function cerrarModalAcusacion() {
        if (accusationModal) accusationModal.classList.remove('active');
    }
    function procesarAccusacion() {
        const culpableElegido = suspectSelect ? suspectSelect.value : null;
        const armaElegida = weaponSelect ? weaponSelect.value : null;
        const locacionElegida = locationSelect ? locationSelect.value : null;
        const haGanado = (
            culpableElegido === culpableSecreto &&
            armaElegida === armaSecreta &&
            locacionElegida === locacionSecreta
        );
        cerrarModalAcusacion();
        terminarPartida(haGanado);
    }

    // --- FUNCIÓN PARA ACTIVAR TODOS LOS LISTENERS ---
    function activarListeners() {
        // Listener de las pestañas
        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (juegoTerminado) return;
                tabLinks.forEach(l => l.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                link.classList.add('active');
                const activePane = document.getElementById(link.dataset.tab);
                if (activePane) activePane.classList.add('active');
            });
        });

        // Listener de las tarjetas de investigación (usando delegación)
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.addEventListener('click', (evento) => {
                if (evento.target.classList.contains('card')) {
                    investigarItem(evento);
                }
            });
        }

        // Listener del modal de pistas
        if (clueModalCloseBtn) clueModalCloseBtn.addEventListener('click', procesarInvestigacion);

        // Listeners del modal de acusación
        if (openModalBtn) openModalBtn.addEventListener('click', abrirModalAcusacion);
        if (closeModalBtn) closeModalBtn.addEventListener('click', cerrarModalAcusacion);
        if (confirmAccusationBtn) confirmAccusationBtn.addEventListener('click', procesarAccusacion);
    }

    // --- PUNTO DE ENTRADA DEL CÓDIGO ---
    // Añadir chequeos para asegurarse de que EPISODE_DATA existe y tiene episodios
    if(typeof EPISODE_DATA !== 'undefined' && Object.keys(EPISODE_DATA).length > 0) {
        prepararBienvenida();
        // Solo añadir listener si el botón existe
        if(startGameBtn) {
            startGameBtn.addEventListener('click', comenzarJuego);
        } else {
             console.error("Botón 'start-game-btn' no encontrado.");
        }
    } else {
        console.error("Error: EPISODE_DATA no está definido o está vacío en data.js");
        if(welcomeStoryElement) welcomeStoryElement.innerHTML = "<p>Error crítico al cargar los datos del juego. Por favor, revisa el archivo data.js y la consola para más detalles.</p>";
        // Opcional: Deshabilitar botón de inicio si hay error
        if (startGameBtn) startGameBtn.disabled = true;
    }

}); // Fin del DOMContentLoaded
// ¡LA LLAVE EXTRA ESTABA AQUÍ!