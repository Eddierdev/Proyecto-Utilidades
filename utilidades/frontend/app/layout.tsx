import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Utilidades",
  description: "Herramientas del día a día",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          background: "var(--bg)",
          color: "var(--text)",
          minHeight: "100vh",
          fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
        }}
      >
        <Navbar />
        <main
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            padding: "36px 24px",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
