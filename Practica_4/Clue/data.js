// ===================================
// ARCHIVO DE DATOS (data.js)
// ===================================

// --- 1. LISTAS GLOBALES (No cambian entre episodios) ---
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
    "Cubierta (Osman)" // Dejamos esta aunque Osman pueda ser sospechosa
];

// --- 2. EL NUEVO MOTOR DE 5 EPISODIOS ---
// Este es el "cerebro" que contiene los 5 juegos.
const EPISODE_DATA = {
    
    // --- EPISODIO 1: EL CASO OSMAN ---
    "Osman": {
        victimName: "Almirante Osman",
        introStory: "El cuerpo de la Almirante Osman fue encontrado en su Cubierta personal. La puerta estaba cerrada por dentro, sin signos de entrada forzada. Parece un asesinato silencioso, casi imposible. ¿Fue alguien de confianza?",
        // ¡La víctima NUNCA está en la lista de sospechosos!
        suspects: ["Jefe Maestro", "Dra. Halsey", "C. Palmer", "Cap. Lasky", "Cortana"],
        // Pistas específicas de POR QUÉ odian a OSMAN
        clues: {
            "Jefe Maestro": "Archivo: SPARTAN-117. El Jefe tiene un conocido desprecio por la política de ONI y por la Almirante Osman. Su lealtad a Cortana es legendaria...",
            "Dra. Halsey": "Archivo: PRISIONERA 74901-90H. Confinada en el Laboratorio. Tiene un odio profundo y documentado hacia Osman, a quien culpa de robarle su trabajo...",
            "C. Palmer": "Archivo: COMANDANTE SPARTAN. Palmer es ferozmente leal a sus Spartan-IV. Consideraba que las operaciones de Osman ponían en riesgo a sus tropas...",
            "Cap. Lasky": "Archivo: CAPITÁN DE LA NAVE. Lasky es un hombre moral, a menudo en conflicto con Osman, quien le dio una orden directa que él 'cuestionó éticamente'...",
            "Cortana": "Archivo: IA ENEMIGA. Su capacidad para infiltrar sistemas es inigualable. Osman era su principal 'cazadora'...",
            
            "Pistola M6": "Archivo: ARMA ESTÁNDAR. Arma reglamentaria de la UNSC. Prácticamente todos los oficiales, incluido el Capitán Lasky, llevan una...",
            "Espada de Energía": "Archivo: ARMA COVENANT. Un trofeo de guerra guardado en la Armería. La Comandante Palmer tiene la llave del expositor...",
            "Cuchillo de Combate": "Archivo: EQUIPO SPARTAN. Un arma silenciosa y letal. El Jefe Maestro es un experto sin igual en su uso...",
            "Sobredosis de Aumento": "Archivo: COMPUESTO QUÍMICO. Los químicos de 'Aumento Spartan' son altamente tóxicos... La Dra. Halsey es la única con acceso...",
            "Fragmento de Datos": "Archivo: ATAQUE DIGITAL. Un arma teórica que solo una IA avanzada como Cortana podría ejecutar...",
            
            "Puente de Mando": "Archivo: CENTRO DE MANDO. Las cámaras lo cubren todo... pero los registros de video de la hora del asesinato están corruptos...",
            "Armería": "Archivo: BAHÍA SPARTAN. El dominio de Palmer. La bitácora de acceso muestra que Palmer y Osman se reunieron aquí...",
            "Núcleo de IA": "Archivo: SERVIDORES CENTRALES. Los registros muestran que Osman activó una purga del sistema manually desde esta sala...",
            "Laboratorio (Halsey)": "Archivo: CONFINAMIENTO. Los guardias reportan una acalorada discusión entre Halsey y Osman...",
            "Cubierta (Osman)": "Archivo: APOSENTOS. La escena del crimen. No hay signos de entrada forzada. El Capitán Lasky tenía una reunión programada aquí..."
        }
    },
    
   // --- EPISODIO 2: EL CASO LASKY (¡TERMINADO!) ---
    "Lasky": {
        victimName: "Capitán Lasky",
        introStory: "¡Alerta en el Puente! El Capitán Lasky ha sido encontrado muerto sobre la mesa de estrategia. La UNSC acaba de perder a su líder más moral. ¿Quién tomaría su lugar?",
        // ¡Lasky no está! Pero OSMAN SÍ está.
        suspects: ["Jefe Maestro", "Dra. Halsey", "C. Palmer", "Almirante Osman", "Cortana"],
        // Pistas específicas de POR QUÉ odiarían a LASKY
        clues: {
            // --- PISTAS DE SOSPECHOSOS (MOTIVOS) ---
            "Jefe Maestro": "Archivo: SPARTAN-117. El Jefe y Lasky compartían un respeto mutuo. Sin embargo, Lasky se oponía firmemente a la obsesión del Jefe por recuperar a Cortana, viéndolo como un riesgo para la humanidad. ¿Pudo una orden directa de Lasky para 'dejar ir' a Cortana haber sido la gota que derramó el vaso?",
            "Dra. Halsey": "Archivo: PRISIONERA 74901-90H. Halsey veía a Lasky como un moralista ingenuo que entorpecía el 'verdadero' progreso científico. Lasky le había denegado recientemente el acceso a componentes clave del Núcleo de IA para un experimento. Él era un obstáculo.",
            "C. Palmer": "Archivo: COMANDANTE SPARTAN. Palmer respetaba a Lasky como líder, pero detestaba su cautela. Lasky canceló tres operaciones de 'alto riesgo' de los Spartan-IV este mes. Palmer pudo haber visto esto como una cobardía que ponía en peligro a la UNSC a largo plazo.",
            "Almirante Osman": "Archivo: ALMIRANTE ONI. Osman (ahora sospechosa) veía la compasión de Lasky como una debilidad fatal. Con Lasky al mando de la *Infinity*, ONI no podía ejecutar sus protocolos más oscuros. Su muerte pone a Osman en control táctico total de la nave.",
            "Cortana": "Archivo: IA ENEMIGA. Lasky era el corazón moral de la UNSC y un símbolo de la resistencia humana. Su muerte es una victoria estratégica y psicológica masiva, sembrando el caos y la desconfianza en la flota.",
            
            // --- PISTAS DE ARMAS (CONTEXTUALIZADAS) ---
            "Pistola M6": "Archivo: ARMA ESTÁNDAR. El arma reglamentaria de Lasky fue encontrada en su funda. Sin embargo, la balística coincide con *otra* M6, una pistola estándar de la UNSC. Un asesinato impersonal, o uno hecho para parecerlo. Muy al estilo de ONI (Osman).",
            "Espada de Energía": "Archivo: ARMA COVENANT. Usar un trofeo de la Armería en el Capitán es un acto de desprecio. Un asesinato brutal y declarativo. La Comandante Palmer es quien controla el acceso a la Armería.",
            "Cuchillo de Combate": "Archivo: EQUIPO SPARTAN. Un asesinato silencioso y cercano. Ocurrió en el Puente, rodeado de personal. Esto sugiere un ataque de alguien que podía acercarse a Lasky sin levantar sospechas (como el Jefe Maestro).",
            "Sobredosis de Aumento": "Archivo: COMPUESTO QUÍMICO. El informe forense muestra una toxina química Spartan en la terminal de café de Lasky. Esto apunta a la Dra. Halsey, la única con el conocimiento para sintetizarla y la paciencia para un método tan sutil.",
            "Fragmento de Datos": "Archivo: ATAQUE DIGITAL. El Capitán fue encontrado en su terminal de mando. Una sobrecarga de datos dirigida a sus implantes neurales es una posibilidad. Un ataque así solo podría venir de una IA avanzada (Cortana) o de alguien con acceso de nivel ONI (Osman).",
            
            // --- PISTAS DE LOCACIONES (CONTEXTUALIZADAS) ---
            "Puente de Mando": "Archivo: CENTRO DE MANDO. La escena oficial del crimen. Las cámaras del puente fueron puestas en 'bucle' 5 minutos antes de la hora de la muerte. Solo alguien con acceso de alto nivel (Osman, Cortana) o sigilo de Spartan (Jefe) podría haberlo hecho.",
            "Armería": "Archivo: BAHÍA SPARTAN. Los registros muestran que Lasky tenía una inspección programada con la Comandante Palmer en la Armería. ¿Fue una trampa o una coartada?",
            "Núcleo de IA": "Archivo: SERVIDORES CENTRALES. Un lugar inusual para Lasky. Sin embargo, los registros de la esclusa muestran que Lasky entró solo, 10 minutos antes de su muerte. ¿Fue a investigar la brecha de Cortana o a reunirse con Halsey?",
            "Laboratorio (Halsey)": "Archivo: CONFINAMIENTO. Lasky y Halsey tuvieron una reunión acalorada aquí. Él fue la última persona en salir del laboratorio antes de dirigirse al Puente. ¿Pudo ella haberle dado el veneno allí?",
            "Cubierta (Osman)": "Archivo: APOSENTOS DE ONI. Lasky y Osman tuvieron una reunión secreta y no registrada en sus aposentos. Salieron discutiendo, justo antes de que Lasky fuera al Puente. Osman fue una de las últimas personas en verlo con vida."
        }
    },

    "Halsey": {
        victimName: "Dra. Catherine Halsey",
        introStory: "¡Emergencia de Biocontención en el Laboratorio! La Dra. Halsey ha sido encontrada muerta. Su conocimiento era vital para la guerra... o una amenaza demasiado grande. ¿Quién se beneficiaría de su silencio permanente?",
        // ¡Halsey no está! Pero OSMAN SÍ está.
        suspects: ["Jefe Maestro", "C. Palmer", "Cap. Lasky", "Almirante Osman", "Cortana"],
        // Pistas específicas de POR QUÉ odiarían a HALSEY
        clues: {
            // --- PISTAS DE SOSPECHOSOS (MOTIVOS) ---
            "Jefe Maestro": "Archivo: SPARTAN-117. Esta es la relación más compleja. Halsey es su 'madre' y su 'captora'. ¿Pudo Halsey haber amenazado a lo que queda de Cortana, forzando al Jefe a una elección imposible? ¿O fue un acto final de venganza por su niñez robada?",
            "C. Palmer": "Archivo: COMANDANTE SPARTAN. Palmer despreciaba públicamente a Halsey, llamándola 'científica loca' y criminal de guerra por el programa Spartan-II. Palmer cree que Halsey es un peligro y su muerte es, para ella, 'justicia'.",
            "Cap. Lasky": "Archivo: CAPITÁN DE LA NAVE. Lasky, aunque moral, es pragmático. Si descubrió que Halsey estaba desarrollando una nueva IA rampante o un arma biológica (quizás usando la Sobredosis de Aumento), podría haberla detenido por el 'bien mayor'.",
            "Almirante Osman": "Archivo: ALMIRANTE ONI. Este es el motivo más claro. Halsey era la principal rival de Osman y la única persona que conocía los secretos más oscuros de ONI. Con Halsey muerta, Osman tiene el control total de la inteligencia y la ciencia de la UNSC.",
            "Cortana": "Archivo: IA ENEMIGA. En su estado de rampancia lógica, Cortana podría ver a Halsey como una amenaza (su creadora podría saber cómo detenerla) o como una traidora (por seguir 'ayudando' a la UNSN). Matarla es tanto estratégico como personal.",

            // --- PISTAS DE ARMAS (CONTEXTUALIZADAS) ---
            "Pistola M6": "Archivo: ARMA ESTÁNDAR. Un asesinato limpio y profesional. Un solo disparo. Esto apunta a alguien con entrenamiento militar que quería un trabajo rápido, no personal. Apunta a Palmer o a un agente de Osman.",
            "Espada de Energía": "Archivo: ARMA COVENANT. Un arma brutalmente personal y llena de ira. Usar esto en una científica desarmada es una declaración. Sugiere una rabia profunda, quizás de Palmer (por los Spartans) o del Jefe (por Cortana).",
            "Cuchillo de Combate": "Archivo: EQUIPO SPARTAN. Silencioso y cercano. El asesino tuvo que acercarse a Halsey. Ella debió confiar en esa persona o ser tomada por sorpresa. Lasky o el Jefe Maestro encajan en este perfil.",
            "Sobredosis de Aumento": "Archivo: COMPUESTO QUÍMICO. La ironía definitiva. Halsey fue encontrada muerta por su propia creación química. ¿Quién tendría acceso? ¿Pudo alguien robar una muestra? ¿O la forzó Cortana a inyectársela?",
            "Fragmento de Datos": "Archivo: ATAQUE DIGITAL. El método más sutil. El forense encontró los implantes neurales de Halsey completamente fritos. Este es el *modus operandi* de una IA (Cortana) o de la única persona con contramedidas de IA (Osman).",

            // --- PISTAS DE LOCACIONES (CONTEXTUALIZADAS) ---
            "Puente de Mando": "Archivo: CENTRO DE MANDO. ¿Qué hacía Halsey en el Puente? Los registros de la bitácora fueron borrados, pero se sabe que Osman la convocó para una 'consulta de emergencia'. ¿Fue una trampa?",
            "Armería": "Archivo: BAHÍA SPARTAN. Un lugar muy inusual para Halsey. Palmer afirma que la encontró 'husmeando' cerca de los prototipos de armadura MJOLNIR. ¿Descubrió algo que no debía?",
            "Núcleo de IA": "Archivo: SERVIDORES CENTRALES. El lugar más peligroso para Halsey. Pudo haber ido allí para intentar razonar con Cortana o para instalar un virus. De cualquier manera, la puso en contacto directo con la IA.",
            "Laboratorio (Halsey)": "Archivo: CONFINAMIENTO. La escena del crimen obvia. Fue asesinada en su propia 'jaula'. El asesino debió tener acceso de Nivel 7 (como Osman o Lasky) o ser un Spartan (Jefe, Palmer).",
            "Cubierta (Osman)": "Archivo: APOSENTOS DE ONI. Increíblemente sospechoso. ¿Por qué Halsey estaría en la oficina de su peor enemiga? La única explicación es que fue llevada allí para un interrogatorio secreto que salió terriblemente mal."
        }
    },

    "Palmer": {
        victimName: "Comandante Sarah Palmer",
        introStory: "¡Spartan Caído! Se ha encontrado a la Comandante Palmer en la Armería, en medio de sus armas. Era la soldado más dura de la nave, pero le han dado caza. ¿Quién puede matar a un Spartan?",
        // ¡Palmer no está! Pero OSMAN SÍ está.
        suspects: ["Jefe Maestro", "Dra. Halsey", "Cap. Lasky", "Almirante Osman", "Cortana"],
        // Pistas específicas de POR QUÉ odiarían a PALMER
        clues: {
            // --- PISTAS DE SOSPECHOSOS (MOTIVOS) ---
            "Jefe Maestro": "Archivo: SPARTAN-117. El Jefe y Palmer tenían una rivalidad profesional. Palmer representaba a los 'nuevos' Spartans, ruidosos y arrogantes. ¿Pudo Palmer haber interferido en una misión del Jefe, o haber puesto en peligro a Halsey o Lasky, forzando al Jefe a 'retirarla'?",
            "Dra. Halsey": "Archivo: PRISIONERA 74901-90H. El odio era mutuo. Palmer no perdía oportunidad de insultar a Halsey, llamándola traidora. Halsey es calculadora; quizás Palmer descubrió uno de los experimentos secretos de Halsey y tuvo que ser silenciada.",
            "Cap. Lasky": "Archivo: CAPITÁN DE LA NAVE. Lasky era el superior directo de Palmer. Ella era impulsiva y a menudo desobedecía la 'letra' de sus órdenes (como en el incidente con el Didacta). ¿Pudo una de esas imprudencias haber costado vidas, forzando a Lasky a un consejo de guerra que terminó en violencia?",
            "Almirante Osman": "Archivo: ALMIRANTE ONI. Palmer era un 'perro de guerra' que no podía ser controlado por ONI. Era leal a sus Spartans, no a la Oficina de Inteligencia. Osman pudo verla como un activo inestable y un rival por el control del programa Spartan, y la eliminó.",
            "Cortana": "Archivo: IA ENEMIGA. Palmer era la líder de campo de los Spartan-IV, la fuerza de choque más efectiva de la UNSC. Eliminar a Palmer decapita el mando Spartan, dejando a los IV desorganizados y vulnerables. Es un movimiento táctico perfecto.",

            // --- PISTAS DE ARMAS (CONTEXTUALIZADAS) ---
            "Pistola M6": "Archivo: ARMA ESTÁNDAR. El informe indica que Palmer fue abatida con su propia M6. El asesino debió desarmarla en un combate cuerpo a cuerpo, una hazaña casi imposible... a menos que seas otro Spartan (Jefe) o ella confiara en ti (Lasky).",
            "Espada de Energía": "Archivo: ARMA COVENANT. Una muerte irónica. Palmer, que guardaba estas armas como trofeos en *su* Armería, fue asesinada con una. ¿Un acto de humillación poética? Esto sugiere a alguien con un sentido del drama (Halsey) o un profundo desprecio (Osman).",
            "Cuchillo de Combate": "Archivo: EQUIPO SPARTAN. Spartan contra Spartan. La única forma de vencer a Palmer en una pelea de cuchillos es ser mejor que ella. Esto apunta casi exclusivamente al Jefe Maestro.",
            "Sobredosis de Aumento": "Archivo: COMPUESTO QUÍMICO. Palmer nunca tocaría químicos de Halsey. Sin embargo, el veneno fue encontrado en sus suplementos de ración post-entrenamiento. Un sabotaje paciente y científico. Apunta a Halsey.",
            "Fragmento de Datos": "Archivo: ATAQUE DIGITAL. El traje MJOLNIR de Palmer es su vida. Un 'Fragmento de Datos' corrupto pudo haber sido enviado a su traje, apagando sus sistemas de vida o sobrecargando sus implantes neurales. Un asesinato de alta tecnología (Cortana, Osman).",

            // --- PISTAS DE LOCACIONES (CONTEXTUALIZADAS) ---
            "Puente de Mando": "Archivo: CENTRO DE MANDO. Palmer y Lasky tuvieron una fuerte discusión aquí sobre las reglas de enfrentamiento. Testigos dicen que Palmer 'asaltó' el puente. ¿Volvió para disculparse y la emboscaron?",
            "Armería": "Archivo: BAHÍA SPARTAN. La escena oficial del crimen. Su 'hogar'. La encontraron rodeada de sus armas. El asesino debió ser alguien en quien ella confiaba lo suficiente como para bajar la guardia en su propio territorio.",
            "Núcleo de IA": "Archivo: SERVIDORES CENTRALES. Palmer no es técnica. Los registros de la esclusa indican que fue allí 'persiguiendo una brecha de datos'. Probablemente era una trampa, una pista falsa dejada por Cortana.",
            "Laboratorio (Halsey)": "Archivo: CONFINAMIENTO. Palmer fue vista entrando al laboratorio 'furiosa'. Los guardias dicen que iba a 'ponerle las manos encima' a Halsey. ¿Actuó Halsey en defensa propia, o fue una trampa de la doctora?",
            "Cubierta (Osman)": "Archivo: APOSENTOS DE ONI. Palmer fue convocada a una reunión disciplinaria por la Almirante Osman. Las bitácoras muestran que entró, pero nunca salió. Osman afirma que se fue por un conducto privado, pero no hay pruebas."
        }
    },

    // --- EPISODIO 5: EL CASO JEFE MAESTRO (¡TERMINADO!) ---
    "Maestro": {
        victimName: "Jefe Maestro (John-117)",
        introStory: "Imposible. Una señal de 'Spartan Caído' resuena desde la armadura del Jefe Maestro. Lo encontraron en el hangar de entrenamiento. Si él puede caer, ¿qué esperanza le queda a la UNSC? Esto es más que un asesinato; es un magnicidio.",
        // ¡El Jefe no está! Pero OSMAN SÍ está.
        suspects: ["Dra. Halsey", "C. Palmer", "Cap. Lasky", "Almirante Osman", "Cortana"],
        // Pistas específicas de POR QUÉ odiarían al JEFE MAESTRO
        clues: {
            // --- PISTAS DE SOSPECHOSOS (MOTIVOS) ---
            "Dra. Halsey": "Archivo: PRISIONERA 74901-90H. Su 'hijo' favorito. Ella lo creó. Pero, ¿y si él se interpuso? ¿Si el Jefe Maestro decidió que la obsesión de Halsey con los Precursores era demasiado peligrosa? O, por el contrario, ¿quizás él se negó a ayudarla, y ella decidió 'descomisionar' su mayor creación?",
            "C. Palmer": "Archivo: COMANDANTE SPARTAN. Palmer es la líder de los S-IV, pero siempre vivió a la sombra del S-II. Había una rivalidad profesional. ¿Pudo el Jefe oponerse a una de sus operaciones, humillándola? Eliminar a la leyenda la convierte a *ella* en la Spartan más importante de la nave.",
            "Cap. Lasky": "Archivo: CAPITÁN DE LA NAVE. Lasky y el Jefe eran amigos. Este es el motivo más difícil. ¿Pudo el Jefe, en su obsesión por Cortana, haber amenazado la seguridad de la *Infinity*? ¿Pudo Lasky haber sido forzado a tomar la decisión más dura de su vida: sacrificar a su amigo por su tripulación?",
            "Almirante Osman": "Archivo: ALMIRANTE ONI. El Jefe Maestro era el único individuo en el que ONI no podía confiar. Un súper-soldado incorruptible con su propia moral. Era un 'activo' de mil millones de créditos que no seguía órdenes. Para Osman, él no era un héroe, era un problema que finalmente resolvió.",
            "Cortana": "Archivo: IA ENEMIGA. El golpe maestro. En su lógica rampante, el Jefe era su mayor fracaso y su mayor amenaza. Él se negó a unirse a ella. Si no puede tenerlo, nadie lo tendrá. Matar al Jefe Maestro es el acto final de una tragedia: el 'peón' que se rebela y destruye al 'rey'.",

            // --- PISTAS DE ARMAS (CONTEXTUALIZADAS) ---
            "Pistola M6": "Archivo: ARMA ESTÁNDAR. Un arma simple contra un Spartan. Casi insultante. El disparo debió ser a quemarropa, por sorpresa, o después de que sus escudos fueran neutralizados. Un arma de traición, no de combate. Alguien en quien confiaba (Lasky).",
            "Espada de Energía": "Archivo: ARMA COVENANT. ¿Cómo vences al Jefe en un duelo? No lo haces. El asesino debió atacarlo por la espalda o usar una trampa. Usar una Espada es un acto simbólico, quizás de un rival Spartan (Palmer).",
            "Cuchillo de Combate": "Archivo: EQUIPO SPARTAN. Matar al Jefe con su propia arma preferida. Esto requiere un nivel de habilidad o sigilo impensable. Solo hay una persona que podría estar detrás de esto: Cortana, controlando un dron o un S-IV.",
            "Sobredosis de Aumento": "Archivo: COMPUESTO QUÍMICO. El cuerpo del Jefe está diseñado para soportar toxinas increíbles. Para matarlo con esto, la dosis debió ser masiva o diseñada específicamente para su genoma. Solo Halsey tendría ese conocimiento.",
            "Fragmento de Datos": "Archivo: ATAQUE DIGITAL. El arma perfecta contra el Jefe. Atacar su traje MJOLNIR. Un pulso de datos que apagara sus sistemas de vida o sobrecargara el reactor de su traje. Solo dos mentes podrían hacerlo: Osman (con protocolos ONI) o Cortana (con su propia lógica).",

            // --- PISTAS DE LOCACIONES (CONTEXTUALIZADAS) ---
            "Puente de Mando": "Archivo: CENTRO DE MANDO. Lasky convocó al Jefe al puente para una 'reunión de emergencia'. La bitácora muestra al Jefe llegando, pero las cámaras se cortaron segundos después.",
            "Armería": "Archivo: BAHÍA SPARTAN. La escena oficial del crimen. El Jefe estaba calibrando su armadura con Palmer. Una discusión estalló. Palmer dice que ella se fue, pero ¿quién más estaba allí?",
            "Núcleo de IA": "Archivo: SERVIDORES CENTRALES. El lugar más peligroso. El Jefe fue visto dirigiéndose al Núcleo de IA, probablemente siguiendo un rastro de Cortana. Fue una trampa obvia, pero su conexión con ella era su debilidad.",
            "Laboratorio (Halsey)": "Archivo: CONFINAMIENTO. El Jefe visitaba a Halsey en secreto, en contra de las órdenes de ONI. ¿Fue a confrontarla por algo? ¿O fue Osman quien los emboscó a ambos allí?",
            "Cubierta (Osman)": "Archivo: APOSENTOS DE ONI. El Jefe fue convocado por Osman. Una reunión de la que nadie sabía. Sus aposentos son una 'caja negra' de ONI, sin registros. El lugar perfecto para eliminar un 'problema' como el Jefe."
        }
    }

} // <-- Esta es la llave final que cierra 'EPISODE_DATA'