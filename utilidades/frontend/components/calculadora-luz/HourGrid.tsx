"use client";

import type { ResultadoDia } from "@/lib/luz";

interface Props {
  dia: ResultadoDia;
}

export default function HourGrid({ dia }: Props) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Encabezado del día */}
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontSize: 12, fontWeight: 600, color: "var(--muted)",
          paddingBottom: 8, marginBottom: 8,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span>{dia.etiqueta}</span>
        <span style={{ fontSize: 11, color: "var(--hint)", fontWeight: 400 }}>
          {dia.fecha.toLocaleDateString("es", { day: "numeric", month: "short" })}
        </span>
      </div>

      {/* Grilla 12 columnas × 2 filas = 24h */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0,1fr))", gap: 3 }}>
        {dia.horas.map(({ hora, luz, esAhora }) => (
          <div
            key={hora}
            style={{
              borderRadius: 4,
              padding: "6px 0",
              textAlign: "center",
              fontSize: 10,
              fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
              transition: "opacity .1s",
              outline: esAhora ? "2px solid var(--amber)" : "none",
              outlineOffset: esAhora ? 1 : 0,
              background: luz ? "rgba(240,165,0,0.18)" : "var(--surface2)",
              color: luz
                ? (esAhora ? "var(--amber)" : "#C68A00")
                : (esAhora ? "var(--amber)" : "var(--hint)"),
              border: luz
                ? "1px solid rgba(240,165,0,0.28)"
                : "1px solid var(--border)",
            }}
          >
            {String(hora).padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
}
