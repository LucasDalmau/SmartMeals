// Vocabulario de dominio de SmartMeals. Los arrays `as const` son la única
// fuente de verdad: el schema de Drizzle deriva sus enums de acá.
// Contenido en español únicamente (CLAUDE.md, amendment 1).

export const RECIPE_CATEGORIES = [
  "poultry",
  "beef",
  "pasta",
  "vegetarian",
  "for-two",
  "breakfast",
  "snack",
] as const;
export type RecipeCategory = (typeof RECIPE_CATEGORIES)[number];

export const UNITS = [
  "g",
  "kg",
  "ml",
  "l",
  "tsp",
  "tbsp",
  "unit",
  "cup",
  "pinch",
  "clove",
  "slice",
] as const;
export type Unit = (typeof UNITS)[number];

export const INGREDIENT_CATEGORIES = [
  "protein",
  "produce",
  "pantry",
  "dairy",
  "frozen",
  "other",
] as const;
export type IngredientCategory = (typeof INGREDIENT_CATEGORIES)[number];

export const MEAL_SLOTS = ["breakfast", "lunch", "snack", "dinner"] as const;
export type MealSlot = (typeof MEAL_SLOTS)[number];

export const PREP_ACTIONS = [
  "cook",
  "cut",
  "portion",
  "freeze",
  "marinate",
] as const;
export type PrepAction = (typeof PREP_ACTIONS)[number];

export const PANTRY_STATUSES = ["enough", "low", "out"] as const;
export type PantryStatus = (typeof PANTRY_STATUSES)[number];

export const GENDERS = ["male", "female"] as const;
export type Gender = (typeof GENDERS)[number];

export const ACTIVITY_LEVELS = [
  "sedentary",
  "light",
  "moderate",
  "active",
  "very-active",
] as const;
export type ActivityLevel = (typeof ACTIVITY_LEVELS)[number];

export const GOALS = ["lose-fat", "maintain", "build-muscle"] as const;
export type Goal = (typeof GOALS)[number];

export type Difficulty = 1 | 2 | 3;

export type Macros = {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
};

// ── Tipos de autoría de seed ────────────────────────────────────────────────
// Las recetas builtin se escriben con estos tipos y el script de seed las
// vuelca a la DB. Convención: las cantidades de ingredientes corresponden a
// `servingsDefault` porciones; los macros son SIEMPRE por porción.

export type SeedIngredient = {
  name: string;
  amount: number;
  unit: Unit;
  category: IngredientCategory;
};

export type SeedStep = {
  text: string;
  timerSeconds?: number;
  /** true = este paso corre solo (horno, hervor) y permite avanzar con otro */
  canParallelize?: boolean;
};

export type SeedPrepItem = {
  name: string;
  action: PrepAction;
  durationMinutes: number;
  /** cuántos días se conserva en heladera una vez hecho */
  storageDays: number;
  freezable: boolean;
};

export type SeedRecipe = {
  slug: string;
  name: string;
  description: string;
  category: RecipeCategory;
  difficulty: Difficulty;
  servingsDefault: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  macrosPerServing: Macros;
  freezable: boolean;
  tags: string[];
  mealSlots: MealSlot[];
  /** slugs de recetas relacionadas; el seed los resuelve a ids */
  variationSlugs: string[];
  ingredients: SeedIngredient[];
  steps: SeedStep[];
  prepDependencies: SeedPrepItem[];
};
