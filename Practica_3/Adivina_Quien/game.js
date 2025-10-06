console.log("Juego cargado correctamente.");
// Base inicial de personajes (casos)
const personajesBase = [
  {
    nombre: "Mario",
    humano: true,
    nintendo: true,
    mujer: false,
    gorra: true,
    animal: false,
    armas: false
  },
  {
    nombre: "Sonic",
    humano: false,
    nintendo: false,
    mujer: false,
    gorra: false,
    animal: true,
    armas: false
  },
  {
    nombre: "Pikachu",
    humano: false,
    nintendo: true,
    mujer: false,
    gorra: false,
    animal: true,
    armas: false
  },
  {
    nombre: "Lara Croft",
    humano: true,
    nintendo: false,
    mujer: true,
    gorra: false,
    animal: false,
    armas: true
  },
  {
    nombre: "Link",
    humano: true,
    nintendo: true,
    mujer: false,
    gorra: true,
    animal: false,
    armas: true
  }
];

// Lista de preguntas (reglas)
const preguntasBase = [
  { atributo: "humano", texto: "¿Es un humano?" },
  { atributo: "nintendo", texto: "¿Pertenece a Nintendo?" },
  { atributo: "mujer", texto: "¿Es mujer?" },
  { atributo: "gorra", texto: "¿Usa gorra o sombrero?" },
  { atributo: "animal", texto: "¿Es un animal?" },
  { atributo: "armas", texto: "¿Usa armas?" }
];


// Variables globales
let personajes = [];
let preguntas = [];
let personajeSecreto = null;

// Referencias del DOM
const questionEl = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const startBtn = document.getElementById("startBtn");
const resultEl = document.getElementById("result");

// Eventos iniciales
startBtn.addEventListener("click", iniciarJuego);
yesBtn.addEventListener("click", () => responder(true));
noBtn.addEventListener("click", () => responder(false));

// Función inicial
function iniciarJuego() {
  personajes = [...personajesBase];
  preguntas = [...preguntasBase];
  personajeSecreto = null;
  resultEl.textContent = "";
  siguientePregunta();
}


// Función responder (se completará después)
function responder(respuesta) {
  const preguntaActual = preguntas.shift(); // quita la primera pregunta

  // Filtrar personajes según la respuesta
  personajes = personajes.filter(p => p[preguntaActual.atributo] === respuesta);

  if (personajes.length === 1) {
    questionEl.textContent = "Creo que ya sé quién es...";
    adivinar();
  } else if (personajes.length === 0) {
    questionEl.textContent = "¡No conozco ese personaje! 😅";
    resultEl.textContent = "Puedes enseñarme después a reconocerlo.";
  } else {
    siguientePregunta(); // pasa a la siguiente pregunta
  }
}


function siguientePregunta() {
  if (preguntas.length === 0) {
    // Si ya no quedan preguntas, adivina
    adivinar();
    return;
  }
  // Toma la primera pregunta disponible
  const preguntaActual = preguntas[0];
  questionEl.textContent = preguntaActual.texto;
}
function adivinar() {
  if (personajes.length === 1) {
    const candidato = personajes[0];
    resultEl.textContent = `¿Tu personaje es ${candidato.nombre}?`;
  } else {
    resultEl.textContent = "No estoy seguro, necesito más preguntas.";
  }
}
