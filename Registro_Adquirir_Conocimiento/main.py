import json
import os
from difflib import get_close_matches

# Ruta de la base de conocimiento
KB_FILE = os.path.join(os.path.dirname(__file__), "knowledge_base.json")

# Cargar la base de conocimiento si existe, si no usar la precargada
if os.path.exists(KB_FILE):
    with open(KB_FILE, "r", encoding="utf-8") as f:
        knowledge_base = json.load(f)
else:
    knowledge_base = {
        "Hola": "Hola, ¿cómo estás?",
        "¿Qué haces?": "De qué te gustaría hablar?",
        "Gracias": "¡Con gusto!"
    }

def guardar_conocimiento():
    """Guardar la base de conocimiento en el archivo JSON"""
    with open(KB_FILE, "w", encoding="utf-8") as f:
        json.dump(knowledge_base, f, ensure_ascii=False, indent=4)

def chat():
    print("Bienvenido al chat. Escribe 'salir' para terminar.")
    while True:
        user_input = input("Tú: ")
        if user_input.lower() == "salir":
            print("Chat: ¡Hasta luego!")
            break

        # Buscar coincidencias aproximadas
        posibles = get_close_matches(user_input, knowledge_base.keys(), n=1, cutoff=0.6)
        if posibles:
            respuesta = knowledge_base[posibles[0]]
            print("Chat:", respuesta)
        else:
            # Si no conoce la pregunta → preguntar al usuario
            print("Chat: No sé la respuesta a eso. ¿Cómo debería responder?")
            nueva_respuesta = input("Tú (respuesta para guardar): ")
            knowledge_base[user_input] = nueva_respuesta
            guardar_conocimiento()
            print("Chat: Gracias, he aprendido algo nuevo ")

if __name__ == "__main__":
    chat()
