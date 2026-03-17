"""
services/luz_service.py
Lógica pura del ciclo rotativo 6×3.
Sin dependencias externas. Fácil de testear.
"""

from datetime import date, timedelta
from typing import List
from pydantic import BaseModel


class HoraLuz(BaseModel):
    hora: int       # 0–23
    luz: bool


CICLO = 9           # 6 sin luz + 3 con luz = 9 horas por ciclo completo
HORAS_SIN_LUZ = 6


def calcular_horas_luz(fecha_consulta: date, inicio_ciclo: date) -> List[HoraLuz]:
    """
    Devuelve las 24 horas del día indicando si hay luz o no,
    basándose en el ciclo rotativo 6×3.
    """
    diff_dias = (fecha_consulta - inicio_ciclo).days

    # Si el día es anterior al inicio del ciclo, no aplica
    if diff_dias < 0:
        return [HoraLuz(hora=h, luz=False) for h in range(24)]

    diff_horas = diff_dias * 24
    resultado = []

    for hora in range(24):
        hora_absoluta = diff_horas + hora
        pos_en_ciclo = hora_absoluta % CICLO
        con_luz = pos_en_ciclo >= HORAS_SIN_LUZ  # posiciones 6,7,8 → con luz
        resultado.append(HoraLuz(hora=hora, luz=con_luz))

    return resultado
