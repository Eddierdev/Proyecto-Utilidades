import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El frontend llama al backend a través de esta variable de entorno
  // En desarrollo: http://localhost:8000
  // En producción: URL de tu backend en Vercel/Railway
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  },
};

export default nextConfig;
