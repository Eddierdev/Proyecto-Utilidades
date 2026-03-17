"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/calculadora-luz", label: "Luz" },
  { href: "/calculadora-porciento", label: "Porcentajes" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const path = usePathname();

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", height: 56,
      borderBottom: "1px solid var(--border)",
      background: "var(--bg)",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <div style={{
          width: 28, height: 28, background: "var(--amber)", borderRadius: 7,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
        }}>
          ⚡
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)" }}>
          utilidades
        </span>
      </Link>

      <div style={{ display: "flex", gap: 4 }}>
        {links.map(({ href, label }) => {
          const active = path === href;
          return (
            <Link key={href} href={href} style={{
              padding: "5px 12px", borderRadius: 6, fontSize: 13,
              fontWeight: active ? 500 : 400,
              color: active ? "var(--text)" : "var(--muted)",
              background: active ? "var(--surface2)" : "transparent",
              textDecoration: "none", transition: "all .15s",
            }}>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
