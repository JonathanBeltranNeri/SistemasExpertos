## Jonathan Beltran Neri 22310188 7E

import heapq  # Librería para manejar una cola de prioridad (mínimo costo primero)

# Grafo con los lugares y sus costos (tiempo en minutos)
# Cada clave es un lugar y sus valores son los vecinos con el costo de moverse hasta ellos
grafo = {
    "Casa": {"Camion1": 10, "Camion2": 5},
    "Camion1": {"Tren": 20},
    "Camion2": {"Tren": 10},
    "Tren": {"Escuela": 10},
    "Escuela": {}
}

# Heurística: estimación de lo que "falta" para llegar a la meta (Escuela)
# No es exacta, solo una guía. Mientras más cerca de la escuela, menor valor.
heuristica = {
    "Casa": 25,
    "Camion1": 20,
    "Camion2": 15,
    "Tren": 10,
    "Escuela": 0
}

def a_estrella(inicio, meta):
    """
    Implementación del algoritmo A*.
    inicio: nodo de partida (Casa)
    meta: nodo destino (Escuela)
    Devuelve: (camino, costo total)
    """
    # Cola de prioridad con elementos (costo_estimado, nodo, camino, costo_real)
    frontera = [(heuristica[inicio], inicio, [inicio], 0)]
    visitados = set()

    while frontera:
        # Tomamos el nodo con menor costo estimado
        costo_estimado, nodo, camino, costo_real = heapq.heappop(frontera)

        # Evitar revisitar nodos
        if nodo in visitados:
            continue
        visitados.add(nodo)

        # Si llegamos a la meta → devolvemos resultado
        if nodo == meta:
            return camino, costo_real

        # Explorar vecinos del nodo actual
        for vecino, costo in grafo[nodo].items():
            # Costo real acumulado
            nuevo_costo_real = costo_real + costo
            # Costo total estimado = costo_real + heurística
            nuevo_costo_estimado = nuevo_costo_real + heuristica[vecino]
            # Guardamos en la frontera para explorar después
            heapq.heappush(frontera, (nuevo_costo_estimado, vecino, camino + [vecino], nuevo_costo_real))

    # Si no encuentra camino
    return None, float("inf")

# Ejecutamos la búsqueda desde Casa hasta Escuela
camino, costo = a_estrella("Casa", "Escuela")

print("Ruta más corta:", " → ".join(camino))
print("Costo total:", costo, "minutos")
