# 🍽️ SmartMeals v2.0

Planificador de comidas semanal con sistema de prep dominical.

## Features v2

- **31+ cenas** en 6 categorías organizadas en listas desplegables
- **Creador de recetas** — agregá tus propias recetas desde la app
- **Buscador por ingrediente** — "tengo pollo" → te muestra todas las recetas compatibles
- **Dark/Light mode** — toggle en la esquina superior derecha
- **Lista de compras automática** según las cenas elegidas
- **Estimador de prep** con tips de almacenamiento
- **Persistencia** — todo se guarda en localStorage entre sesiones

## Deploy en Vercel

1. Subí este proyecto a GitHub (arrastrá todos los archivos al repo)
2. En [vercel.com](https://vercel.com) → New Project → Import → Deploy
3. Listo

## Desarrollo local

```bash
npm install
npm run dev
```

## Cómo agregar recetas

**Desde la app:** Usá la pestaña ➕ Nueva. Las recetas custom se guardan en localStorage.

**Desde el código:** Editá `src/data/meals.js` y seguí la estructura existente.

## Estructura del proyecto

```
src/
├── app/
│   ├── page.js        ← componente principal con toda la lógica
│   ├── layout.js      ← metadata
│   └── globals.css    ← CSS con variables para dark/light theme
└── data/
    └── meals.js       ← base de datos de recetas, snacks, prep
```
