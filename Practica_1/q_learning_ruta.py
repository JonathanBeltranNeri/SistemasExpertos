## Jonathan Beltran Neri 22310188 7E


import numpy as np
import random

# Definimos los estados (lugares)
estados = ["Casa", "Camion1", "Camion2", "Tren", "Escuela"]

# Diccionario de acciones posibles (transiciones)
acciones = {
    "Casa": ["Camion1", "Camion2"],
    "Camion1": ["Tren"],
    "Camion2": ["Tren"],
    "Tren": ["Escuela"],
    "Escuela": []
}

# Recompensas (entre más rápido llegues a la escuela, mayor la recompensa)
recompensas = {
    ("Casa", "Camion1"): -10,
    ("Casa", "Camion2"): -5,
    ("Camion1", "Tren"): -20,
    ("Camion2", "Tren"): -10,
    ("Tren", "Escuela"): 0  # ya no 100, porque aquí no sumas minutos
}


# Inicializamos la tabla Q en ceros
Q = {}
for estado in estados:
    for accion in acciones[estado]:
        Q[(estado, accion)] = 0.0

# Parámetros de Q-Learning
alpha = 0.1   # tasa de aprendizaje
gamma = 0.9   # factor de descuento
epsilon = 0.2 # probabilidad de explorar

# Entrenamiento
episodios = 500
for _ in range(episodios):
    estado = "Casa"
    
    while estado != "Escuela":
        # Decidimos acción (explorar o explotar)
        if random.uniform(0, 1) < epsilon:
            accion = random.choice(acciones[estado])
        else:
            # Escoger la acción con mayor valor Q
            accion = max(acciones[estado], key=lambda a: Q[(estado, a)])
        
        # Obtenemos recompensa y nuevo estado
        recompensa = recompensas[(estado, accion)]
        nuevo_estado = accion
        
        # Valor futuro esperado
        if nuevo_estado != "Escuela":
            max_futuro = max(Q[(nuevo_estado, a)] for a in acciones[nuevo_estado])
        else:
            max_futuro = 0
        
        # Actualizamos Q usando la fórmula
        Q[(estado, accion)] += alpha * (recompensa + gamma * max_futuro - Q[(estado, accion)])
        
        # Avanzamos al nuevo estado
        estado = nuevo_estado

# -----------------------
# Prueba del agente entrenado
# -----------------------
estado = "Casa"
camino = [estado]
costo_total = 0

while estado != "Escuela":
    accion = max(acciones[estado], key=lambda a: Q[(estado, a)])
    costo_total += -recompensas[(estado, accion)]  # usamos negativos como tiempos
    estado = accion
    camino.append(estado)

print("Ruta aprendida por el agente:", " → ".join(camino))
print("Costo total aproximado:", costo_total, "minutos")
print("\nTabla Q final:")
for k, v in Q.items():
    print(f"{k}: {v:.2f}")
