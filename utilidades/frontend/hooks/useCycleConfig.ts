"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "utilidades_ciclo_inicio";

export function useCycleConfig() {
  const [inicioCiclo, setInicioCicloState] = useState<string>("");

  // Cargar desde localStorage al montar
  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado) setInicioCicloState(guardado);
  }, []);

  const setInicioCiclo = (fecha: string) => {
    setInicioCicloState(fecha);
    localStorage.setItem(STORAGE_KEY, fecha);
  };

  return { inicioCiclo, setInicioCiclo };
}
