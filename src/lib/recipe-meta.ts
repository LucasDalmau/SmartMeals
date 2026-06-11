import type { MealSlot, RecipeCategory } from "@/types";

// Mapeos estáticos categoría/slot → clases Tailwind (los nombres de clase
// deben ser literales completos para que Tailwind los detecte). Los colores
// reales viven en globals.css y derivan de DESIGN.md.

export const CATEGORY_BG: Record<RecipeCategory, string> = {
  poultry: "bg-cat-poultry",
  beef: "bg-cat-beef",
  pasta: "bg-cat-pasta",
  vegetarian: "bg-cat-veggie",
  "for-two": "bg-cat-two",
  breakfast: "bg-cat-breakfast",
  snack: "bg-cat-snack",
};

export const SLOT_TEXT: Record<MealSlot, string> = {
  breakfast: "text-slot-breakfast",
  lunch: "text-slot-lunch",
  snack: "text-slot-snack",
  dinner: "text-slot-dinner",
};

export const SLOT_EMOJI: Record<MealSlot, string> = {
  breakfast: "☀️",
  lunch: "🥗",
  snack: "🍎",
  dinner: "🍽️",
};

/** Orden de presentación de categorías en el browse */
export const CATEGORY_ORDER: RecipeCategory[] = [
  "poultry",
  "beef",
  "pasta",
  "vegetarian",
  "for-two",
  "breakfast",
  "snack",
];
