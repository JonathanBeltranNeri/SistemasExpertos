// ===================================
// ARCHIVO DE DATOS (data.js)
// Almacena todos los datos del juego.
// ===================================

// --- 1. LISTAS DE COMPONENTES ---
const LISTA_SOSPECHOSOS = [
    "Jefe Maestro",
    "Dra. Halsey",
    "C. Palmer",
    "Cap. Lasky",
    "Cortana"
];

const LISTA_ARMAS = [
    "Pistola M6",
    "Espada de Energía",
    "Cuchillo de Combate",
    "Sobredosis de Aumento",
    "Fragmento de Datos"
];

const LISTA_LOCACIONES = [
    "Puente de Mando",
    "Armería",
    "Núcleo de IA",
    "Laboratorio (Halsey)",
    "Cubierta (Osman)"
];


// --- 2. LAS 5 HISTORIAS (FINALES) ---
// Usamos una clase para organizar mejor cada historia
class Historia {
    constructor(culpable, arma, locacion, narrativa) {
        this.culpable = culpable;
        this.arma = arma;
        this.locacion = locacion;
        this.narrativa = narrativa;
    }
}

// Creamos un array con las 5 historias secretas
const HISTORIAS_SECRETAS = [
    new Historia(
        "Dra. Halsey",
        "Sobredosis de Aumento",
        "Laboratorio (Halsey)",
        "¡CASO RESUELTO! Fue la Dra. Halsey. Osman la visitó en su laboratorio para exigirle datos sobre Cortana. Halsey fingió cooperar y le ofreció un 'estimulante' que en realidad era una dosis letal de químicos de aumento Spartan. Pura venganza."
    ),
    new Historia(
        "Cortana",
        "Fragmento de Datos",
        "Núcleo de IA",
        "¡CASO RESUELTO! Fue Cortana. Infiltró un fragmento lógico en la nave. Osman detectó la intrusión y fue al Núcleo de IA para purgarlo. Era una trampa. Cortana le envió un pulso de datos que sobrecargó sus implantes neuronales."
    ),
    new Historia(
        "Cap. Lasky",
        "Pistola M6",
        "Cubierta (Osman)",
        "¡CASO RESUELTO! Fue el Capitán Lasky. Descubrió que Osman planeaba sacrificar una colonia civil 'infectada' por Cortana. Se enfrentó a ella en sus aposentos y, al negarse ella a ceder, Lasky la ejecutó para evitar el genocidio."
    ),
    new Historia(
        "Jefe Maestro",
        "Cuchillo de Combate",
        "Puente de Mando",
        "¡CASO RESUELTO! Fue el Jefe Maestro. Interceptó una orden de Osman para capturar y 'profanar' los fragmentos de Cortana para crear un arma. La confrontó en el Puente. Viendo que la política de ONI era el enemigo, la eliminó silenciosamente."
    ),
    new Historia(
        "C. Palmer",
        "Espada de Energía",
        "Armería",
        "¡CASO RESUELTO! Fue la Comandante Palmer. Osman planeaba disolver a los Spartan-IV, viéndolos como 'poco leales'. Citó a Palmer en la Armería para relevarla. Palmer lo vio como una traición y, tras un forcejeo, la empaló con una Espada de Energía."
    )
];