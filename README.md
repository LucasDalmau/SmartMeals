# 🍽️ Meal Plan Semanal

Planificador de comidas semanal con sistema de prep dominical, lista de compras automática y seguimiento de skills culinarias.

## Features

- **31 cenas** en 6 categorías (china, clásica, mexicana, mediterránea, americana, para dos)
- **12 snacks** proteicos para distintos momentos del día
- **Lista de compras automática** que se genera según las cenas elegidas
- **Estimador de prep** que calcula tiempo necesario el domingo
- **Tips de almacenamiento** con vida útil de cada preparación
- **Persistencia** — tus selecciones se guardan en localStorage

## Deploy en Vercel

### Opción 1: Desde GitHub (recomendado)

1. Subí este proyecto a un repo en GitHub
2. Andá a [vercel.com](https://vercel.com) → New Project → Import tu repo
3. Deploy. Listo.

### Opción 2: CLI

```bash
npm install
npx vercel
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000)

## Cómo agregar recetas

Editá `src/data/meals.js`. Cada cena sigue esta estructura:

```js
{
  id: 32,                    // número único
  name: "Tu Plato",
  cat: "chinese",            // chinese, normal, mexican, mediterranean, american, pareja
  emoji: "🍜",
  time: "15 min",
  prot: "45g",
  cal: "550",
  sv: 1,                     // porciones (1 o 2)
  diff: 2,                   // 1=fácil, 2=media, 3=desafío
  skill: "Técnica a practicar",
  prep: ["chicken", "rice"], // IDs de items de PREP_ITEMS
  shop: [                    // items extra a comprar
    { i: "Ingrediente", c: "Categoría" }
  ],
  steps: ["Paso 1", "Paso 2"]
}
```

Categorías de compras: `Proteínas`, `Verduras`, `Carbs`, `Lácteos`, `Despensa`

## Agregar items de prep

En `PREP_ITEMS` (fresh o frozen):

```js
{ id: "nuevo_prep", what: "Descripción", time: 10, tip: "Tip", storage: "Vida útil" }
```

Después referencialo en las cenas con el `id`.

## Mobile

Desde el celular, abrí la URL de Vercel y usá "Agregar a pantalla de inicio" para usarla como app.
