/**
 * lib/luz.ts
 * Lógica del ciclo rotativo 6×3.
 * Entrada: hora exacta en que empezó el bloque actual + si hay luz ahora.
 */

export interface HoraLuz {
  hora: number;
  luz: boolean;
  esAhora?: boolean;
}

export interface ResultadoDia {
  fecha: Date;
  horas: HoraLuz[];
  etiqueta: string;
}

const CICLO = 9;
const HORAS_SIN_LUZ = 6;

export function calcularDias(
  horaInicioBloque: Date,
  hayLuzAhora: boolean,
  diasAVer: number
): ResultadoDia[] {
  const posInicio = hayLuzAhora ? HORAS_SIN_LUZ : 0;

  function getLuz(fechaHora: Date): boolean {
    const horasDesde = (fechaHora.getTime() - horaInicioBloque.getTime()) / 3600000;
    if (horasDesde < 0) return false;
    const posEnCiclo = (posInicio + horasDesde) % CICLO;
    return posEnCiclo >= HORAS_SIN_LUZ;
  }

  const ahora = new Date();
  const resultado: ResultadoDia[] = [];
  const etiquetas = ["Hoy", "Mañana", "Pasado mañana"];
  const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];

  for (let d = 0; d < diasAVer; d++) {
    const dia = new Date(ahora);
    dia.setDate(dia.getDate() + d);
    dia.setHours(0, 0, 0, 0);
    const etiqueta = d < 3 ? etiquetas[d] : dias[dia.getDay()] + " " + dia.getDate();
    const horas: HoraLuz[] = Array.from({ length: 24 }, (_, h) => {
      const celda = new Date(dia);
      celda.setHours(h);
      return { hora: h, luz: getLuz(celda), esAhora: d === 0 && h === ahora.getHours() };
    });
    resultado.push({ fecha: dia, horas, etiqueta });
  }
  return resultado;
}

export function minutosParaProximaLuz(horaInicioBloque: Date, hayLuzAhora: boolean): number | null {
  if (hayLuzAhora) return null;
  const ahora = new Date();
  for (let m = 1; m <= CICLO * 60; m++) {
    const t = new Date(ahora.getTime() + m * 60000);
    const horasDesde = (t.getTime() - horaInicioBloque.getTime()) / 3600000;
    if (horasDesde < 0) continue;
    const pos = (HORAS_SIN_LUZ + horasDesde) % CICLO;
    if (pos >= HORAS_SIN_LUZ) return m;
  }
  return null;
}
