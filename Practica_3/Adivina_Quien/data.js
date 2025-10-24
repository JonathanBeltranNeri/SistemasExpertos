export const arbolDecision = {
    // Nivel 1
    pregunta: "¿Tu personaje es de origen humano o tiene una apariencia predominantemente humana?",
    si: {
        // --- RAMA: HUMANOS / HUMANOIDES ---
        // Nivel 2
        pregunta: "¿El universo de tu personaje se basa en la fantasía, con magia, dioses o criaturas míticas?",
        si: {
            // Nivel 3
            pregunta: "¿Tu personaje es el protagonista de un RPG (Juego de Rol)?",
            si: {
                // Nivel 4
                pregunta: "¿El juego es un RPG occidental, como los de Dungeons & Dragons?",
                si: {
                    // Nivel 5
                    pregunta: "¿Es un elfo vampiro conocido por su astucia y elegancia?",
                    si: { personaje: "Astarion", img: "images/astarion.jpg" },
                    no: { personaje: "Shadowheart", img: "images/shadowheart.jpg" }
                },
                no: {
                    // Nivel 5
                    pregunta: "¿Tu personaje es famoso por llevar una espada de tamaño descomunal?",
                    si: { personaje: "Cloud Strife", img: "images/cloud.jpg" },
                    no: { personaje: "Link", img: "images/link.jpg" }
                }
            },
            no: {
                // Nivel 4
                pregunta: "¿Es un dios o semidiós que se ha enfrentado a panteones enteros?",
                si: { personaje: "Kratos", img: "images/kratos.jpg" },
                no: { personaje: "Mario", img: "images/mario.jpg" }
            }
        },
        no: {
            // --- RAMA: MUNDO REALISTA O CIENCIA FICCIÓN ---
            // Nivel 3
            pregunta: "¿Tu personaje pertenece a un universo de ciencia ficción, con tecnología futurista, aliens o súper soldados?",
            si: {
                // Nivel 4
                pregunta: "¿Es un 'súper soldado' que lleva una armadura verde y un casco que oculta su rostro?",
                si: { personaje: "Master Chief", img: "images/masterchief.jpg" },
                no: {
                    // Nivel 5
                    pregunta: "¿Es un espía legendario, experto en sigilo y conocido por esconderse en cajas de cartón?",
                    si: { personaje: "Solid Snake", img: "images/snake.jpg" },
                    no: { personaje: "Agente 47", img: "images/47.jpg" }
                }
            },
            no: {
                // --- RAMA: MUNDO MODERNO O HISTÓRICO ---
                // Nivel 4
                pregunta: "¿La historia de tu personaje se desarrolla en un entorno histórico, antes del año 1950?",
                si: { personaje: "Arthur Morgan", img: "images/arthur.jpg" },
                no: {
                    // Nivel 5
                    pregunta: "¿Tu personaje es una mujer?",
                    si: {
                        // Nivel 6
                        pregunta: "¿Es una arqueóloga que explora tumbas y ruinas antiguas?",
                        si: { personaje: "Lara Croft", img: "images/lara.jpg" },
                        no: { personaje: "Ellie Williams", img: "images/ellie.jpg" }
                    },
                    no: {
                        // Nivel 6
                        pregunta: "¿Se dedica a buscar tesoros perdidos y tiene fama de tener mucha suerte?",
                        si: { personaje: "Nathan Drake", img: "images/nathan.jpg" },
                        no: { personaje: "Kazuma Kiryu", img: "images/kiryu.jpg" }
                    }
                }
            }
        }
    },
    no: {
        // --- RAMA: NO HUMANOS ---
        // Nivel 2
        pregunta: "¿Tu personaje es un animal o está basado en uno?",
        si: {
            // Nivel 3
            pregunta: "¿Es conocido por su increíble velocidad?",
            si: { personaje: "Sonic the Hedgehog", img: "images/sonic.jpg" },
            no: {
                // Nivel 4
                pregunta: "¿Pertenece a la franquicia Pokémon?",
                si: { personaje: "Pikachu", img: "images/pikachu.jpg" },
                no: {
                    // Nivel 5
                    pregunta: "¿Es un marsupial naranja que gira para atacar?",
                    si: { personaje: "Crash Bandicoot", img: "images/crash.jpg" },
                    no: { personaje: "Donkey Kong", img: "images/dk.jpg" } // Fallback
                }
            }
        },
        no: {
            // --- RAMA: CRIATURAS, ROBOTS O INDEFINIDOS ---
            // Nivel 3
            pregunta: "¿El mundo de tu personaje está hecho principalmente de bloques?",
            si: { personaje: "Steve", img: "images/steve.jpg" },
            no: {
                // Nivel 4
                pregunta: "¿Tu personaje está hecho de tela, como un muñeco de trapo?",
                si: { personaje: "Sackboy", img: "images/sackboy.jpg" },
                no: {
                    // Nivel 5
                    pregunta: "¿Es una esfera amarilla que come puntos en un laberinto?",
                    si: { personaje: "Pac-Man", img: "images/pacman.jpg" },
                    no: { personaje: "Kirby", img: "images/kirby.jpg" } // Fallback
                }
            }
        }
    }
};