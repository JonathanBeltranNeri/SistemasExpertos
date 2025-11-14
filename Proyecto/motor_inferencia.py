import sqlite3

DB_FILE = 'Proyecto/conocimiento.db'

def obtener_recomendacion(historia, accion, duracion, pensar):
    """
    Motor de inferencia.
    Consulta la BD y devuelve la mejor recomendación.
    """
    try:
        conn = sqlite3.connect(DB_FILE)
        conn.row_factory = sqlite3.Row # Para acceder a resultados por nombre
        cursor = conn.cursor()

        # La consulta SQL es nuestro "motor"
        sql_query = """
        SELECT genero, ejemplo FROM generos
        WHERE 
            (prefiere_historia = ? OR prefiere_historia = 'indiferente') AND
            (prefiere_accion = ? OR prefiere_accion = 'indiferente') AND
            (duracion_juego = ? OR duracion_juego = 'indiferente') AND
            (prefiere_pensar = ? OR prefiere_pensar = 'indiferente')
        ORDER BY
            (prefiere_historia = ?) DESC,
            (prefiere_accion = ?) DESC,
            (duracion_juego = ?) DESC,
            (prefiere_pensar = ?) DESC
        LIMIT 1;
        """
        
        params = [
            historia, accion, duracion, pensar,
            historia, accion, duracion, pensar
        ]

        cursor.execute(sql_query, params)
        resultado = cursor.fetchone() 
        return resultado # Devuelve una fila (como dict) o None

    except sqlite3.Error as e:
        print(f"Error en el motor de inferencia: {e}")
        return None
    finally:
        if conn:
            conn.close()