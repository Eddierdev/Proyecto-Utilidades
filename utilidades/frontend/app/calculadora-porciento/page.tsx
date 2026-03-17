"use client";

import { useState } from "react";
import Link from "next/link";

type Modo = "basico" | "cuanto" | "cambio";

const modos: { id: Modo; label: string; desc: string }[] = [
  { id: "basico",  label: "X% de N",       desc: "¿Cuánto es el X% de un número?" },
  { id: "cuanto",  label: "N es X% de...", desc: "¿N es el X% de qué número?" },
  { id: "cambio",  label: "Variación %",   desc: "¿Cuánto cambió de A a B?" },
];

export default function CalculadoraPorcientoPage() {
  const [modo, setModo] = useState<Modo>("basico");

  // Modo básico: X% de N
  const [pct, setPct]   = useState("");
  const [num, setNum]   = useState("");

  // Modo cuánto: N es X% de ?
  const [parte, setParte] = useState("");
  const [pct2, setPct2]   = useState("");

  // Modo cambio: de A a B
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  function calcBasico() {
    const p = parseFloat(pct), n = parseFloat(num);
    if (isNaN(p) || isNaN(n)) return null;
    return (p / 100) * n;
  }
  function calcCuanto() {
    const pa = parseFloat(parte), p = parseFloat(pct2);
    if (isNaN(pa) || isNaN(p) || p === 0) return null;
    return (pa * 100) / p;
  }
  function calcCambio() {
    const a = parseFloat(desde), b = parseFloat(hasta);
    if (isNaN(a) || isNaN(b) || a === 0) return null;
    return ((b - a) / Math.abs(a)) * 100;
  }

  const resBasico  = calcBasico();
  const resCuanto  = calcCuanto();
  const resCambio  = calcCambio();

  const inputStyle = {
    height: 40, background: "var(--surface2)",
    border: "1px solid var(--border)", borderRadius: 6,
    padding: "0 12px", color: "var(--text)", fontSize: 15,
    fontFamily: "'Geist Mono', monospace", outline: "none",
    width: "100%", transition: "border .15s",
  } as React.CSSProperties;

  const fmtNum = (n: number) =>
    Number.isInteger(n) ? n.toString() : n.toFixed(4).replace(/\.?0+$/, "");

  return (
    <div style={{ maxWidth: 560 }}>
      <style>{`
        .modo-btn { padding: 7px 14px; border-radius: 6px; font-size: 13px; cursor: pointer; font-family: inherit; transition: all .15s; white-space: nowrap; }
        .modo-btn.active { background: var(--amber-dim); border: 1px solid var(--amber-border); color: var(--amber); }
        .modo-btn.inactive { background: transparent; border: 1px solid var(--border); color: var(--muted); }
        .modo-btn.inactive:hover { border-color: var(--border2); color: var(--text); }
        input[type=number]:focus { border-color: var(--amber-border) !important; }
        .field-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .field-label { font-size: 13px; color: var(--muted); white-space: nowrap; min-width: 30px; }
        .result-box { background: var(--amber-dim); border: 1px solid var(--amber-border); border-radius: 10px; padding: 20px 24px; margin-top: 20px; }
        .result-label { font-size: 11px; color: var(--amber); opacity: .7; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 6px; }
        .result-val { font-size: 28px; font-weight: 700; color: var(--amber); letter-spacing: -0.03em; font-family: 'Geist Mono', monospace; }
        .result-sub { font-size: 13px; color: var(--amber); opacity: .6; margin-top: 4px; }
      `}</style>

      {/* Breadcrumb + header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--hint)", marginBottom: 8 }}>
          <Link href="/" style={{ color: "var(--hint)", textDecoration: "none" }}>Inicio</Link>
          <span>/</span>
          <span style={{ color: "var(--muted)" }}>Calculadora de %</span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 4 }}>
          Calculadora de porcentajes
        </h1>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          Tres modos de cálculo para cualquier situación.
        </p>
      </div>

      {/* Selector de modo */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {modos.map((m) => (
          <button
            key={m.id}
            className={`modo-btn ${modo === m.id ? "active" : "inactive"}`}
            onClick={() => setModo(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
        <p style={{ fontSize: 12, color: "var(--hint)", marginBottom: 16 }}>
          {modos.find(m => m.id === modo)?.desc}
        </p>

        {/* Modo: X% de N */}
        {modo === "basico" && (
          <>
            <div className="field-row">
              <span className="field-label">%</span>
              <input type="number" style={inputStyle} placeholder="Ej: 15" value={pct} onChange={e => setPct(e.target.value)} />
            </div>
            <div className="field-row">
              <span className="field-label">de</span>
              <input type="number" style={inputStyle} placeholder="Ej: 200" value={num} onChange={e => setNum(e.target.value)} />
            </div>
            {resBasico !== null && (
              <div className="result-box">
                <div className="result-label">Resultado</div>
                <div className="result-val">{fmtNum(resBasico)}</div>
                <div className="result-sub">El {pct}% de {num} es {fmtNum(resBasico)}</div>
              </div>
            )}
          </>
        )}

        {/* Modo: N es X% de ? */}
        {modo === "cuanto" && (
          <>
            <div className="field-row">
              <span className="field-label">N</span>
              <input type="number" style={inputStyle} placeholder="Ej: 30" value={parte} onChange={e => setParte(e.target.value)} />
            </div>
            <div className="field-row">
              <span className="field-label">es el</span>
              <input type="number" style={inputStyle} placeholder="Ej: 15" value={pct2} onChange={e => setPct2(e.target.value)} />
              <span className="field-label">% de...</span>
            </div>
            {resCuanto !== null && (
              <div className="result-box">
                <div className="result-label">Resultado</div>
                <div className="result-val">{fmtNum(resCuanto)}</div>
                <div className="result-sub">{parte} es el {pct2}% de {fmtNum(resCuanto)}</div>
              </div>
            )}
          </>
        )}

        {/* Modo: variación de A a B */}
        {modo === "cambio" && (
          <>
            <div className="field-row">
              <span className="field-label">De</span>
              <input type="number" style={inputStyle} placeholder="Ej: 80" value={desde} onChange={e => setDesde(e.target.value)} />
            </div>
            <div className="field-row">
              <span className="field-label">a</span>
              <input type="number" style={inputStyle} placeholder="Ej: 100" value={hasta} onChange={e => setHasta(e.target.value)} />
            </div>
            {resCambio !== null && (
              <div className="result-box">
                <div className="result-label">{resCambio >= 0 ? "Aumento" : "Disminución"}</div>
                <div className="result-val" style={{ color: resCambio >= 0 ? "var(--amber)" : "#E05C5C" }}>
                  {resCambio >= 0 ? "+" : ""}{fmtNum(resCambio)}%
                </div>
                <div className="result-sub">
                  {resCambio >= 0
                    ? `Subió ${fmtNum(Math.abs(resCambio))}% (de ${desde} a ${hasta})`
                    : `Bajó ${fmtNum(Math.abs(resCambio))}% (de ${desde} a ${hasta})`}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
