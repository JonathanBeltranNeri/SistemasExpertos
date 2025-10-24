// game.js

// 1. Importamos el árbol de decisiones por defecto
import { arbolDecision as arbolPorDefecto } from './data.js';

// 2. Referencias a los elementos del HTML
const questionEl = document.getElementById('question');
const personajeImgEl = document.getElementById('personajeImg');
const startBtn = document.getElementById('startBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const backBtn = document.getElementById('backBtn');

// Referencias al formulario de aprendizaje
const learningContainer = document.getElementById('learning-container');
const newCharacterInput = document.getElementById('new-character');
const newQuestionInput = document.getElementById('new-question');
const newImageInput = document.getElementById('new-image'); 
const saveBtn = document.getElementById('save-btn');

const restartBtn = document.createElement('button');
restartBtn.id = 'restartBtn';
restartBtn.textContent = 'JUGAR DE NUEVO';

// 3. Variables de estado del juego
let arbolDecision; // El árbol que usaremos, puede venir del localStorage
let nodoActual;
let historial = [];
let ultimoNodoIncorrecto; // NUEVO: Guardaremos el nodo donde el juego falló

// --- FUNCIONES PRINCIPALES ---

function iniciarJuego() {
    // MODIFICADO: Cargar el árbol desde localStorage o usar el de por defecto
    const arbolGuardado = localStorage.getItem('arbolDecisionJuego');
    arbolDecision = arbolGuardado ? JSON.parse(arbolGuardado) : arbolPorDefecto;

    nodoActual = arbolDecision;
    historial = [];
    
    // Ocultar elementos innecesarios al inicio
    personajeImgEl.style.display = 'none';
    learningContainer.style.display = 'none';
    if (document.getElementById('restartBtn')) {
        document.getElementById('restartBtn').remove();
    }
    
    startBtn.style.display = 'none';
    yesBtn.style.display = 'inline-block';
    noBtn.style.display = 'inline-block';
    backBtn.style.display = 'none';
    
    mostrarPregunta();
}

function mostrarPregunta() {
    if (nodoActual.pregunta) {
        questionEl.textContent = nodoActual.pregunta;
    } else {
        // Si no hay pregunta, es una respuesta final
        questionEl.textContent = `¿Tu personaje es ${nodoActual.personaje}?`;
        personajeImgEl.src = nodoActual.img;
        personajeImgEl.alt = nodoActual.personaje;
        personajeImgEl.style.display = 'block';
    }
}

function manejarRespuesta(respuesta) {
    // Si estamos en un personaje (hoja del árbol)
    if (!nodoActual.pregunta) {
        if (respuesta) { // El usuario dice SÍ (adivinamos bien)
            mostrarResultado(true);
        } else { // El usuario dice NO (fallamos)
            
            // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
            // Creamos una COPIA del personaje incorrecto en lugar de una referencia.
            ultimoNodoIncorrecto = { personaje: nodoActual.personaje, img: nodoActual.img };
            
            activarModoAprendizaje();
        }
        return;
    }

    // Navegación normal
    historial.push(nodoActual);
    nodoActual = respuesta ? nodoActual.si : nodoActual.no;
    backBtn.style.display = 'inline-block';
    mostrarPregunta();
}

function regresarPregunta() {
    if (historial.length > 0) {
        nodoActual = historial.pop();
        personajeImgEl.style.display = 'none'; // Ocultar imagen si volvemos atrás desde una respuesta
        mostrarPregunta();
    }
    if (historial.length === 0) {
        backBtn.style.display = 'none';
    }
}

function mostrarResultado(adivinado) {
    personajeImgEl.style.display = 'block';
    questionEl.textContent = adivinado ? `¡Genial! He adivinado.` : `¡Tu personaje es ${nodoActual.personaje}!`;

    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    backBtn.style.display = 'none';

    document.getElementById('game').appendChild(restartBtn);
}

// --- NUEVAS FUNCIONES DE APRENDIZAJE ---

function activarModoAprendizaje() {
    // Ocultamos los botones del juego y la imagen
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    backBtn.style.display = 'none';
    personajeImgEl.style.display = 'none';

    // Mostramos el formulario de aprendizaje
    questionEl.textContent = '¡Oh, no! Me rindo.';
    learningContainer.style.display = 'block';
}

function guardarNuevoPersonaje() {
    const nuevoPersonajeNombre = newCharacterInput.value.trim();
    const nuevaPregunta = newQuestionInput.value.trim();
    const nuevaImagenUrl = newImageInput.value.trim(); // 1. LEE LA NUEVA URL

    if (!nuevoPersonajeNombre || !nuevaPregunta) {
        alert("Por favor, completa ambos campos para enseñarme.");
        return;
    }

    // 2. USA LA URL O EL VALOR POR DEFECTO
    const imagenFinal = nuevaImagenUrl ? nuevaImagenUrl : "images/default.png";

    // Creamos el nuevo nodo para el personaje del usuario
    const nuevoPersonajeNodo = {
        personaje: nuevoPersonajeNombre,
        img: imagenFinal // 3. ASIGNA LA IMAGEN FINAL
    };

    // Reemplazamos el nodo incorrecto con la nueva pregunta
    Object.assign(nodoActual, {
        pregunta: nuevaPregunta,
        si: nuevoPersonajeNodo,
        no: ultimoNodoIncorrecto
    });
    
    // Guardamos el árbol actualizado en localStorage
    localStorage.setItem('arbolDecisionJuego', JSON.stringify(arbolDecision));

    // Limpiamos y reiniciamos
    newCharacterInput.value = '';
    newQuestionInput.value = '';
    newImageInput.value = ''; // 4. LIMPIA EL NUEVO CAMPO
    alert("¡Gracias! He aprendido algo nuevo.");
    iniciarJuego();
}

// 4. Asignamos los eventos a los botones
startBtn.addEventListener('click', iniciarJuego);
yesBtn.addEventListener('click', () => manejarRespuesta(true));
noBtn.addEventListener('click', () => manejarRespuesta(false));
backBtn.addEventListener('click', regresarPregunta);
restartBtn.addEventListener('click', iniciarJuego);
saveBtn.addEventListener('click', guardarNuevoPersonaje); // NUEVO evento

// Inicia el juego al cargar la página
iniciarJuego();
// game.js

// --- LÓGICA PARA RESTAURAR CONOCIMIENTO ---
const resetStorageBtn = document.getElementById('reset-storage-btn');

function restaurarConocimiento() {
    if (confirm("¿Estás seguro de que quieres borrar todo lo que ha aprendido el juego? Se restaurará el conocimiento original.")) {
        localStorage.removeItem('arbolDecisionJuego');
        alert("El conocimiento ha sido restaurado. El juego se reiniciará.");
        location.reload(); // Recarga la página
    }
}

resetStorageBtn.addEventListener('click', restaurarConocimiento);