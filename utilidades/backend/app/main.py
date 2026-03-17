from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import luz

app = FastAPI(
    title="Utilidades API",
    description="Backend de la plataforma Utilidades",
    version="0.1.0",
)

# CORS — permite llamadas desde el frontend Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, cambia esto por tu dominio de Vercel
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers — cada utilidad tiene su propio router
app.include_router(luz.router, prefix="/api/luz", tags=["Calculadora de Luz"])


@app.get("/")
def root():
    return {"status": "ok", "mensaje": "API Utilidades funcionando"}
