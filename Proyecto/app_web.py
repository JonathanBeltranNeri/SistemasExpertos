from flask import Flask, render_template, request
import sqlite3

# --- ¡LA MAGIA MODULAR! ---
# Importamos nuestra propia función del otro archivo
from motor_inferencia import obtener_recomendacion

# Inicializa la aplicación Flask
app = Flask(__name__)

# RUTA 1: La página principal (la encuesta)
@app.route('/')
def index():
    # render_template busca en la carpeta 'templates'
    # CORREGIDO: Solo se necesita el nombre del archivo
    return render_template('index.html', resultado=None)

# RUTA 2: La acción de recomendar (cuando se aprieta el botón)
@app.route('/recomendar', methods=['POST'])
def recomendar():
    
    # 1. Obtener datos del formulario HTML
    sel_hist_acc = request.form['historia_accion']
    sel_duracion = request.form['duracion']
    sel_pensar = request.form['pensar']

    # 2. Traducir datos para el motor (texto a 'si'/'no')
    historia = 'si' if sel_hist_acc == 'Una buena historia' else 'no'
    accion = 'si' if sel_hist_acc == 'Acción rápida' else 'no'
    duracion = 'larga' if sel_duracion == 'Largos (más de 30 horas)' else 'corta'
    pensar = 'si' if sel_pensar == 'Sí, retos mentales' else 'no'
    
    # 3. Llamar al motor de inferencia
    recomendacion = obtener_recomendacion(historia, accion, duracion, pensar)

    # 4. Preparar la "explicación" para la web
    explicacion = {
        "preferencia": sel_hist_acc,
        "duracion": sel_duracion,
        "pensar": sel_pensar
    }

    # 5. Devolver la página, pero esta vez CON los resultados
    # CORREGIDO: Solo se necesita el nombre del archivo
    return render_template('index.html', resultado=recomendacion, explicacion=explicacion)

# Esto es para pruebas locales
if __name__ == "__main__":
    app.run(debug=True)