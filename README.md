# ⚡ Utilidades

Plataforma web modular y escalable de herramientas del día a día. Construida con **Next.js + TypeScript** en el frontend y **Python (FastAPI)** en el backend. Diseñada para crecer: cada nueva utilidad se agrega como un módulo independiente sin afectar las existentes.

---

## 🚀 Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Estilos | Tailwind CSS |
| Backend | Python 3.11 + FastAPI |
| Deploy Frontend | Vercel |
| Deploy Backend | Vercel Serverless Functions (Python) o Railway |

---

## 🧩 Funcionalidades

### ✅ 1. Calculadora de Luz (Sistema 6×3)
Calcula en qué horas del día hay electricidad, basándose en un ciclo rotativo de **6 horas sin luz** y **3 horas con luz**.

- El usuario configura la **fecha de inicio del ciclo** (día 1)
- Selecciona cualquier fecha y ve las **24 horas del día** coloreadas: 🟡 con luz / ⬛ sin luz
- El ciclo rota automáticamente desde la fecha de inicio configurada

### 🔜 Próximas utilidades (por agregar)
- ...más herramientas en el futuro sin romper las existentes

---

## 📁 Estructura del proyecto

```
utilidades/
├── frontend/                  # Next.js + TypeScript
│   ├── app/
│   │   ├── layout.tsx         # Layout global
│   │   ├── page.tsx           # Página de inicio / hub de utilidades
│   │   └── calculadora-luz/
│   │       └── page.tsx       # Utilidad 1: Calculadora de luz
│   ├── components/
│   │   ├── ui/                # Componentes reutilizables (botones, cards...)
│   │   └── calculadora-luz/   # Componentes específicos de esta utilidad
│   │       ├── HourGrid.tsx
│   │       ├── DatePicker.tsx
│   │       └── CycleConfig.tsx
│   ├── lib/
│   │   └── luz.ts             # Lógica del ciclo 6×3 (pura, testeable)
│   ├── hooks/
│   │   └── useCycleConfig.ts  # Hook para guardar config del ciclo
│   ├── public/
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                   # FastAPI (Python)
│   ├── app/
│   │   ├── main.py            # Entry point FastAPI
│   │   ├── routers/
│   │   │   └── luz.py         # Endpoints de la calculadora de luz
│   │   └── services/
│   │       └── luz_service.py # Lógica del ciclo 6×3
│   ├── requirements.txt
│   └── vercel.json            # Config para deploy en Vercel (Python)
│
├── .gitignore
├── README.md
└── vercel.json                # Config raíz (monorepo)
```

---

## ⚙️ Instalación local

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# → http://localhost:8000
```

---

## 🔌 API — Calculadora de Luz

### `GET /api/luz/dia`
Devuelve las horas con y sin luz para un día específico.

**Query params:**
| Param | Tipo | Descripción |
|-------|------|-------------|
| `fecha` | `string` (YYYY-MM-DD) | Día a consultar |
| `inicio_ciclo` | `string` (YYYY-MM-DD) | Fecha del día 1 del ciclo |

**Respuesta:**
```json
{
  "fecha": "2024-03-15",
  "horas": [
    { "hora": 0, "luz": false },
    { "hora": 1, "luz": false },
    { "hora": 2, "luz": true },
    ...
  ],
  "total_horas_luz": 3,
  "total_horas_sin_luz": 6
}
```

---

## 🌐 Deploy en Vercel

### Frontend
Vercel detecta automáticamente Next.js. Solo conecta el repositorio y apunta al directorio `frontend/`.

### Backend (Python / FastAPI)
Usa las **Serverless Functions de Vercel para Python**, o despliega en [Railway](https://railway.app) para mayor flexibilidad.

---

## 🏗️ Principios de escalabilidad

1. **Cada utilidad es un módulo independiente** — nueva ruta, nuevos componentes, nuevo router en el backend.
2. **La lógica de negocio vive en `lib/` y `services/`** — fácil de testear y reutilizar.
3. **Componentes UI genéricos en `components/ui/`** — se comparten entre utilidades.
4. **Sin efectos secundarios entre módulos** — agregar la utilidad 2 nunca toca el código de la utilidad 1.

---

## 📄 Licencia

MIT — libre de usar, modificar y distribuir.
