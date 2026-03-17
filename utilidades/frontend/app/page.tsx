import Link from "next/link";

const utilidades = [
  {
    href: "/calculadora-luz",
    icon: "💡",
    titulo: "Calculadora de luz",
    descripcion: "Visualiza qué horas del día tendrás electricidad según el ciclo 6×3 rotativo.",
    disponible: true,
  },
  {
    href: "/calculadora-porciento",
    icon: "📊",
    titulo: "Calculadora de %",
    descripcion: "Calcula porcentajes, variaciones y proporciones en tres modos distintos.",
    disponible: true,
  },
  {
    href: "#",
    icon: "🔧",
    titulo: "Próxima utilidad",
    descripcion: "Nuevas herramientas se irán agregando sin afectar las existentes.",
    disponible: false,
  },
];

export default function Home() {
  return (
    <div>
      <style>{`
        .tool-card {
          display: block;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          text-decoration: none;
          color: var(--text);
          transition: all .2s;
        }
        .tool-card:hover {
          border-color: var(--border2);
          background: var(--surface2);
          transform: translateY(-2px);
        }
        .tool-card-soon {
          opacity: 0.45;
          pointer-events: none;
        }
      `}</style>

      {/* Hero */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 8 }}>
          Herramientas del día a día
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>
          Un conjunto de utilidades simples y rápidas para lo que necesitas.
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {utilidades.map((u) => (
          <Link key={u.href} href={u.href} className={`tool-card${!u.disponible ? " tool-card-soon" : ""}`}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "var(--amber-dim)", border: "1px solid var(--amber-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, marginBottom: 14,
            }}>
              {u.icon}
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 5, letterSpacing: "-0.01em", color: "var(--text)" }}>
              {u.titulo}
            </h3>
            <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
              {u.descripcion}
            </p>
            {u.disponible ? (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 5, marginTop: 12,
                fontSize: 11, fontWeight: 500, color: "var(--amber)",
                background: "var(--amber-dim)", border: "1px solid var(--amber-border)",
                borderRadius: 20, padding: "3px 8px",
              }}>
                <div style={{ width: 5, height: 5, background: "var(--amber)", borderRadius: "50%" }} />
                Disponible
              </div>
            ) : (
              <div style={{
                display: "inline-block", marginTop: 12, fontSize: 11,
                color: "var(--hint)", background: "var(--surface2)",
                border: "1px solid var(--border)", borderRadius: 20, padding: "3px 8px",
              }}>
                Próximamente
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
