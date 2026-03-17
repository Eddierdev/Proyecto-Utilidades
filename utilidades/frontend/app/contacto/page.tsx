import Link from "next/link";

const contactos = [
  {
    icon: "💬",
    label: "WhatsApp",
    valor: "+53 5679 4011",
    href: "https://wa.me/5356794011",
    descripcion: "Escríbeme directo",
  },
  {
    icon: "✉️",
    label: "Email",
    valor: "eddierefrain567@gmail.com",
    href: "mailto:eddierefrain567@gmail.com",
    descripcion: "Respondo en menos de 24h",
  },
  {
    icon: "🐙",
    label: "GitHub",
    valor: "github.com/Eddierdev",
    href: "https://github.com/Eddierdev",
    descripcion: "Mira mis proyectos",
  },
];

export default function ContactoPage() {
  return (
    <div style={{ maxWidth: 560 }}>
      <style>{`
        .contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px 20px;
          text-decoration: none;
          color: var(--text);
          transition: all .2s;
          margin-bottom: 10px;
        }
        .contact-card:hover {
          border-color: var(--border2);
          background: var(--surface2);
          transform: translateX(3px);
        }
        .contact-card:last-child { margin-bottom: 0; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--hint)", marginBottom: 10 }}>
          <Link href="/" style={{ color: "var(--hint)", textDecoration: "none" }}>Inicio</Link>
          <span>/</span>
          <span style={{ color: "var(--muted)" }}>Contacto</span>
        </div>

        {/* Avatar inicial */}
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: "var(--amber-dim)", border: "1px solid var(--amber-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, fontWeight: 700, color: "var(--amber)",
          marginBottom: 16,
        }}>
          EE
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 4 }}>
          Eddier Efraín Sánchez Armengol
        </h1>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          Desarrollador web · Creador de Utilidades
        </p>
      </div>

      {/* Cards de contacto */}
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--hint)", marginBottom: 14 }}>
        Formas de contacto
      </p>

      {contactos.map((c) => (
        <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-card">
          {/* Icono */}
          <div style={{
            width: 42, height: 42, borderRadius: 10, flexShrink: 0,
            background: "var(--amber-dim)", border: "1px solid var(--amber-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>
            {c.icon}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 11, color: "var(--hint)", marginBottom: 2, fontWeight: 500, letterSpacing: ".04em", textTransform: "uppercase" }}>
              {c.label}
            </p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {c.valor}
            </p>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>{c.descripcion}</p>
          </div>

          {/* Flecha */}
          <div style={{ color: "var(--hint)", fontSize: 16, flexShrink: 0 }}>→</div>
        </a>
      ))}
    </div>
  );
}
