import sqlite3
import os

DB_FILE = 'Proyecto/conocimiento.db'

def crear_base_de_datos():
    """
    Crea y puebla la base de datos de conocimiento.
    Si ya existe, la borra para empezar de cero.
    """
    if os.path.exists(DB_FILE):
        os.remove(DB_FILE)
        print(f"Base de datos '{DB_FILE}' anterior eliminada.")

    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()

        # Crear la tabla
        cursor.execute('''
        CREATE TABLE generos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            genero TEXT NOT NULL,
            prefiere_historia TEXT,
            prefiere_accion TEXT,
            duracion_juego TEXT,
            prefiere_pensar TEXT,
            ejemplo TEXT
        );
        ''')
        print("Tabla 'generos' creada con éxito.")

        # --- CONOCIMIENTO EXPANDIDO ---
        # Añadimos 5 reglas nuevas
        conocimiento = [
            # Originales
            ('RPG (Juego de Rol)', 'si', 'no', 'larga', 'indiferente', 'Baldur\'s Gate 3, The Witcher 3'),
            ('Shooter (Disparos)', 'no', 'si', 'indiferente', 'no', 'Call of Duty, Valorant'),
            ('Estrategia (RTS/Turnos)', 'indiferente', 'no', 'larga', 'si', 'Age of Empires IV, Civilization VI'),
            ('Puzzle (Rompecabezas)', 'no', 'no', 'corta', 'si', 'Portal 2, Tetris Effect'),
            ('Aventura de Acción', 'si', 'si', 'larga', 'no', 'God of War, The Last of Us'),
            ('Indie (Casual)', 'indiferente', 'no', 'corta', 'no', 'Stardew Valley, Hades'),
            
            # --- NUEVAS REGLAS ---
            ('Terror (Survival Horror)', 'si', 'no', 'corta', 'si', 'Resident Evil 4 Remake, Alan Wake 2'),
            ('Simulación (Gestión)', 'indiferente', 'no', 'larga', 'si', 'Cities: Skylines II, Factorio'),
            ('Peleas (Fighting)', 'no', 'si', 'corta', 'no', 'Mortal Kombat 1, Street Fighter 6'),
            ('Deportes', 'no', 'si', 'indiferente', 'no', 'EA Sports FC 24, NBA 2K24'),
            ('Sigilo (Stealth)', 'si', 'no', 'indiferente', 'si', 'Metal Gear Solid V, Hitman 3')
        ]
        
        cursor.executemany('''
        INSERT INTO generos (genero, prefiere_historia, prefiere_accion, duracion_juego, prefiere_pensar, ejemplo)
        VALUES (?, ?, ?, ?, ?, ?);
        ''', conocimiento)
        
        # Ahora el mensaje reflejará el nuevo total
        print(f"Se insertaron {len(conocimiento)} reglas de conocimiento.")

        conn.commit()
        
    except sqlite3.Error as e:
        print(f"Error al crear la base de datos: {e}")
    finally:
        if conn:
            conn.close()
            print(f"Base de datos '{DB_FILE}' creada y cerrada.")

if __name__ == "__main__":
    crear_base_de_datos()