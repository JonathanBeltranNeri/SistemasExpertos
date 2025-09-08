# Archivo: Modus_Tollens.py
# Ejemplo de Modus Tollens en Python

# Premisa 1: Si hay fuego, entonces hay humo
def si_hay_fuego_entonces_hay_humo(fuego):
    if fuego:
        return True  # Hay humo
    else:
        return False  # No hay humo

# Premisa 2: No hay humo
humo = False

# Inferencia
fuego = not humo  # Si no hay humo, no hay fuego

print("Modus Tollens:")
print("¿Hay humo?", humo)
print("¿Hay fuego?", fuego)
