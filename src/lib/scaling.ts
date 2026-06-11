import type { Macros, RecipeCategory } from "@/types";

// Escalado de porciones (CLAUDE.md, feature 9). Convenciones del schema:
// - Las cantidades de ingredientes corresponden a `servingsDefault` porciones.
// - Los macros son SIEMPRE por porción.
// - En recetas "para dos" cocinás para dos pero tus macros personales son
//   una porción de cada dos (feature 3: pre-divididos a porción personal).

export function scaleFactor(servings: number, servingsDefault: number): number {
  if (servingsDefault <= 0) throw new Error("servingsDefault debe ser > 0");
  if (servings < 0) throw new Error("servings no puede ser negativo");
  return servings / servingsDefault;
}

/** Cantidad de un ingrediente para `servings` porciones, redondeada a 2 decimales. */
export function scaleAmount(
  amount: number,
  servings: number,
  servingsDefault: number,
): number {
  return Math.round(amount * scaleFactor(servings, servingsDefault) * 100) / 100;
}

/** Macros totales de `servings` porciones (macros de entrada: por porción). */
export function scaleMacros(perServing: Macros, servings: number): Macros {
  if (servings < 0) throw new Error("servings no puede ser negativo");
  return {
    protein: Math.round(perServing.protein * servings * 10) / 10,
    carbs: Math.round(perServing.carbs * servings * 10) / 10,
    fats: Math.round(perServing.fats * servings * 10) / 10,
    calories: Math.round(perServing.calories * servings),
  };
}

/** Porciones que te corresponden a vos de lo cocinado. */
export function personalServings(
  category: RecipeCategory,
  servings: number,
): number {
  return category === "for-two" ? servings / 2 : servings;
}

/** Macros personales de una entrada del plan (para tracking semanal). */
export function personalMacros(
  perServing: Macros,
  category: RecipeCategory,
  servings: number,
): Macros {
  return scaleMacros(perServing, personalServings(category, servings));
}

export function sumMacros(items: Macros[]): Macros {
  return items.reduce(
    (acc, m) => ({
      protein: Math.round((acc.protein + m.protein) * 10) / 10,
      carbs: Math.round((acc.carbs + m.carbs) * 10) / 10,
      fats: Math.round((acc.fats + m.fats) * 10) / 10,
      calories: acc.calories + m.calories,
    }),
    { protein: 0, carbs: 0, fats: 0, calories: 0 },
  );
}
