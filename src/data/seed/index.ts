import type { SeedRecipe } from "@/types";
import { SEED_RECIPES } from "./recipes";
import { LEGACY_RECIPES } from "./legacy-recipes";

// Todas las recetas builtin: 10 argentinas escritas a mano + 42 importadas
// de la v2 (31 cenas + 11 snacks).
export const ALL_RECIPES: SeedRecipe[] = [...SEED_RECIPES, ...LEGACY_RECIPES];

export { SEED_RECIPES, LEGACY_RECIPES };
