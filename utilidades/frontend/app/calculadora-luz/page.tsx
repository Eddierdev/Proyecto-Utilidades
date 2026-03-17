"use client";

import { useState, useCallback } from "react";
import { calcularDias, minutosParaProximaLuz } from "@/lib/luz";
import HourGrid from "@/components/calculadora-luz/HourGrid";
import Link from "next/link";

export default function CalculadoraLuzPage() {
  const now = new Date();
  const defaultTime = `${String(now.getHours()).padStart(2, "0")}:00`;

  const [hayLuz, setHayLuz] = useState(true);
  const [horaInicio, setHoraInicio] = useState(defaultTime);
  const [diasAVer, setDiasAVer] = useState(3);
  const [calculado, setCalculado] = useState(false);

  const buildInicioBloque = useCallback(() => {
    const [hh, mm] = horaInicio.split(":").map(Number);
    const d = new Date();
    d.setHours(hh, mm, 0, 0);
    if (d > new Date()) d.setDate(d.getDate() - 1);
    return d;
  }, [horaInicio]);

  const inicioBloque = buildInicioBloque();
  const dias = calculado ? calcularDias(inicioBloque, hayLuz, diasAVer) : [];
  const minutos = calculado ? minutosParaProximaLuz(inicioBloque, hayLuz) : null;
  const horasProx = minutos !== null ? Math.floor(minutos / 60) : 0;
  const minsProx = minutos !== null ? minutos % 60 : 0;
  const horaProxLuz = minutos !== null
    ? new Date(Date.now() + minutos * 60000).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <div style={{ maxWidth: 720 }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--hint)", marginBottom: 8 }}>
          <Link href="/" style={{ color: "var(--hint)", textDecoration: "none" }}>Inicio</Link>
          <span>/</span>
          <span style={{ color: "var(--muted)" }}>Calculadora de luz</span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 4 }}>
          Calculadora de luz
        </h1>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          Sistema rotativo · 6 horas sin luz · 3 horas con luz
        </p>
      </div>

      {/* Config */}
      <div
        style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 12, padding: 20, marginBottom: 20,
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--hint)", marginBottom: 16 }}>
          Configuración del ciclo
        </p>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
          {/* Toggle luz */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, color: "var(--muted)" }}>¿Hay luz ahora mismo?</label>
            <div style={{ display: "flex", gap: 6 }}>
              {[true, false].map((v) => {
                const active = hayLuz === v;
                return (
                  <button
                    key={String(v)}
                    onClick={() => setHayLuz(v)}
                    style={{
                      padding: "7px 14px", borderRadius: 6, fontSize: 13, cursor: "pointer",
                      fontFamily: "inherit", transition: "all .15s",
                      border: active
                        ? (v ? "1px solid var(--amber-border)" : "1px solid var(--border2)")
                        : "1px solid var(--border)",
                      background: active
                        ? (v ? "var(--amber-dim)" : "var(--surface2)")
                        : "transparent",
                      color: active
                        ? (v ? "var(--amber)" : "var(--text)")
                        : "var(--muted)",
                    }}
                  >
                    {v ? "Sí, hay luz" : "Sin luz ahora"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hora inicio */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, color: "var(--muted)" }}>Empezó a las</label>
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              style={{
                height: 36, width: 130, background: "var(--surface2)",
                border: "1px solid var(--border)", borderRadius: 6,
                padding: "0 10px", color: "var(--text)", fontSize: 13,
                fontFamily: "'Geist Mono', monospace", outline: "none",
              }}
            />
          </div>

          {/* Días */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, color: "var(--muted)" }}>Días a ver</label>
            <input
              type="number"
              min={1} max={7} value={diasAVer} step={1}
              onChange={(e) => setDiasAVer(Math.min(7, Math.max(1, parseInt(e.target.value) || 1)))}
              style={{
                height: 36, width: 70, background: "var(--surface2)",
                border: "1px solid var(--border)", borderRadius: 6,
                padding: "0 10px", color: "var(--text)", fontSize: 13,
                fontFamily: "inherit", outline: "none",
              }}
            />
          </div>

          {/* Botón */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, color: "transparent" }}>_</label>
            <button
              onClick={() => setCalculado(true)}
              style={{
                height: 36, padding: "0 18px",
                background: "var(--amber)", color: "#000",
                border: "none", borderRadius: 6,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Calcular
            </button>
          </div>
        </div>
      </div>

      {/* Resultado vacío */}
      {!calculado && (
        <div
          style={{
            border: "1px dashed var(--border)", borderRadius: 12,
            padding: 48, textAlign: "center", color: "var(--hint)", fontSize: 13,
          }}
        >
          Configura el ciclo arriba y presiona <strong style={{ color: "var(--muted)" }}>Calcular</strong> para ver el resultado.
        </div>
      )}

      {/* Resultado */}
      {calculado && (
        <>
          {/* Métricas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 10, marginBottom: 16 }}>
            {[
              { label: "Con luz / día", val: "3 h", color: "var(--amber)" },
              { label: "Sin luz / día", val: "6 h", color: "var(--muted)" },
              {
                label: "Próxima luz en",
                val: minutos === null ? "Ahora" : (horasProx > 0 ? `${horasProx}h ` : "") + `${minsProx}m`,
                color: "var(--amber)",
              },
            ].map((m) => (
              <div
                key={m.label}
                style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 8, padding: "14px 16px",
                }}
              >
                <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>{m.label}</p>
                <p style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: m.color }}>{m.val}</p>
              </div>
            ))}
          </div>

          {/* Banner próxima luz */}
          {horaProxLuz && (
            <div
              style={{
                background: "var(--amber-dim)", border: "1px solid var(--amber-border)",
                borderRadius: 8, padding: "14px 18px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div>
                <p style={{ fontSize: 11, color: "var(--amber)", opacity: .7, marginBottom: 3, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase" }}>
                  Próximo bloque con luz
                </p>
                <p style={{ fontSize: 20, fontWeight: 700, color: "var(--amber)", letterSpacing: "-0.02em" }}>
                  {horaProxLuz}
                </p>
              </div>
              <p style={{ fontSize: 13, color: "var(--amber)", opacity: .6 }}>
                en {horasProx > 0 ? `${horasProx}h ` : ""}{minsProx}min
              </p>
            </div>
          )}

          {/* Grilla días */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              {[{ cls: "on", label: "Con luz" }, { cls: "off", label: "Sin luz" }].map((l) => (
                <div key={l.cls} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)" }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: 3,
                    background: l.cls === "on" ? "rgba(240,165,0,0.3)" : "var(--surface2)",
                    border: l.cls === "on" ? "1px solid var(--amber-border)" : "1px solid var(--border)",
                  }} />
                  {l.label}
                </div>
              ))}
            </div>
            {dias.map((dia, i) => (
              <HourGrid key={i} dia={dia} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
