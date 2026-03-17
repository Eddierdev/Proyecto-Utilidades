"""
routers/luz.py
Endpoints de la Calculadora de Luz.
"""

from fastapi import APIRouter, Query, HTTPException
from datetime import date
from typing import List
from pydantic import BaseModel
from app.services.luz_service import calcular_horas_luz, HoraLuz

router = APIRouter()


class RespuestaLuz(BaseModel):
    fecha: date
    inicio_ciclo: date
    horas: List[HoraLuz]
    total_horas_luz: int
    total_horas_sin_luz: int


@router.get("/dia", response_model=RespuestaLuz)
def obtener_luz_del_dia(
    fecha: date = Query(..., description="Día a consultar (YYYY-MM-DD)"),
    inicio_ciclo: date = Query(..., description="Fecha del día 1 del ciclo (YYYY-MM-DD)"),
):
    """
    Devuelve las 24 horas del día indicando si hay luz o no,
    según el ciclo rotativo 6×3 configurado por el usuario.
    """
    if inicio_ciclo > fecha:
        raise HTTPException(
            status_code=400,
            detail="La fecha de inicio del ciclo no puede ser posterior al día consultado.",
        )

    horas = calcular_horas_luz(fecha, inicio_ciclo)
    total_luz = sum(1 for h in horas if h.luz)

    return RespuestaLuz(
        fecha=fecha,
        inicio_ciclo=inicio_ciclo,
        horas=horas,
        total_horas_luz=total_luz,
        total_horas_sin_luz=24 - total_luz,
    )
