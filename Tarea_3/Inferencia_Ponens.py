# Archivo: Inferencia_Ponens.py
# Ejemplo de Modus Ponens en Python

# Premisa 1: Si llueve, entonces la calle estará mojada
def si_llueve_entonces_calle_mojada(llueve):
    if llueve:
        return True  # La calle está mojada
    else:
        return False  # La calle no está mojada

# Premisa 2: Está lloviendo
llueve = True

# Inferencia
calle_mojada = si_llueve_entonces_calle_mojada(llueve)

print("Modus Ponens:")
print("¿Está lloviendo?", llueve)
print("¿La calle está mojada?", calle_mojada)
