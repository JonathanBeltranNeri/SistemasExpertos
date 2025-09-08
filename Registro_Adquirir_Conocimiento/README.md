# Registro_Adquirir_Conocimiento

## Descripción del proyecto
Este proyecto implementa un **chat sencillo con adquisición de conocimiento**.  
El chat tiene respuestas precargadas y puede aprender **nuevas preguntas y respuestas** durante la interacción con el usuario, guardándolas en un archivo JSON para su uso futuro.

Este proyecto está desarrollado en **Python**, tecnología ampliamente utilizada en empresas para desarrollo de **chatbots, automatización y proyectos de inteligencia artificial**.

---

## Funcionalidades principales

1. **Respuestas precargadas**:  
   - `"Hola"` → `"Hola, ¿cómo estás?"`  
   - `"¿Qué haces?"` → `"De qué te gustaría hablar?"`  
   - `"Gracias"` → `"¡Con gusto!"`  

2. **Adquisición de conocimiento**:  
   - Si el chat no conoce la pregunta, solicita al usuario la respuesta y la guarda automáticamente en `knowledge_base.json`.

3. **Persistencia de datos**:  
   - Las preguntas y respuestas nuevas se guardan en `knowledge_base.json` dentro del proyecto, permitiendo que el chat recuerde las interacciones en futuras ejecuciones.

4. **Búsqueda aproximada (opcional)**:  
   - El chat puede reconocer preguntas **similares** usando coincidencia aproximada (ejemplo: `"Ola"` será reconocido como `"Hola"`).

---

## Archivos del proyecto

Registro_Adquirir_Conocimiento/
│
├── main.py # Chat principal
├── knowledge_base.json # Base de conocimiento (se actualiza automáticamente)
├── README.md # Este archivo
└── requirements.txt # Dependencias (opcional)

yaml
Copy code

---

## Instrucciones de uso

1. Abre una terminal y navega a la carpeta del proyecto:

```bash
cd Registro_Adquirir_Conocimiento
Ejecuta el chat:

bash
Copy code
python main.py
Interactúa con el chat escribiendo tus preguntas.

Para salir, escribe salir.

Si el chat no conoce una pregunta, te pedirá la respuesta y la guardará automáticamente.

Ejemplo de interacción
makefile
Copy code
Tú: Hola
Chat: Hola, ¿cómo estás?

Tú: ¿Cuál es la capital de Francia?
Chat: No sé la respuesta a eso. ¿Cómo debería responder?
Tú (respuesta para guardar): París
Chat: Gracias, he aprendido algo nuevo 😊

Tú: ¿Cuál es la capital de Francia?
Chat: París

Tú: salir
Chat: ¡Hasta luego!
Tecnologías utilizadas
Python 3.x

JSON para almacenamiento de conocimiento

difflib (para coincidencia aproximada de preguntas)

Autor
Nombre: Jonathan Beltrán
Proyecto: Registro_Adquirir_Conocimiento