import { describe, expect, it } from "vitest";
import { ALL_RECIPES, LEGACY_RECIPES, SEED_RECIPES } from "@/data/seed";

// Validaciones estáticas del contenido del seed. La regla de kcal viene de
// CLAUDE.md (amendment 2): proteína 4 kcal/g, carbs 4 kcal/g, grasas 9 kcal/g,
// con tolerancia del 5%.

describe("seed: 10 recetas argentinas", () => {
  it("tiene exactamente 10 recetas nuevas y 42 legacy (52 total)", () => {
    expect(SEED_RECIPES).toHaveLength(10);
    expect(LEGACY_RECIPES).toHaveLength(42);
    expect(ALL_RECIPES).toHaveLength(52);
  });

  it("los slugs son únicos en todo el catálogo", () => {
    const slugs = ALL_RECIPES.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(ALL_RECIPES.map((r) => [r.slug, r] as const))(
    "%s: las calorías coinciden con los macros (±5%)",
    (_slug, recipe) => {
      const m = recipe.macrosPerServing;
      const computed = m.protein * 4 + m.carbs * 4 + m.fats * 9;
      const deviation = Math.abs(computed - m.calories) / m.calories;
      expect(deviation).toBeLessThanOrEqual(0.05);
    },
  );

  it.each(ALL_RECIPES.map((r) => [r.slug, r] as const))(
    "%s: estructura completa",
    (_slug, recipe) => {
      expect(recipe.ingredients.length).toBeGreaterThan(0);
      expect(recipe.steps.length).toBeGreaterThan(0);
      expect(recipe.mealSlots.length).toBeGreaterThan(0);
      expect(recipe.difficulty).toBeGreaterThanOrEqual(1);
      expect(recipe.difficulty).toBeLessThanOrEqual(3);
      expect(recipe.servingsDefault).toBeGreaterThanOrEqual(1);
      // Las "para dos" arrancan en 2 porciones (CLAUDE.md, feature 9).
      if (recipe.category === "for-two") {
        expect(recipe.servingsDefault).toBe(2);
      }
    },
  );

  it("las variaciones apuntan a slugs existentes y no a sí mismas", () => {
    const slugs = new Set(ALL_RECIPES.map((r) => r.slug));
    for (const recipe of ALL_RECIPES) {
      for (const variation of recipe.variationSlugs) {
        expect(slugs.has(variation), `${recipe.slug} → ${variation}`).toBe(true);
        expect(variation).not.toBe(recipe.slug);
      }
    }
  });

  it("los timers son razonables (entre 10s y 2h)", () => {
    for (const recipe of ALL_RECIPES) {
      for (const step of recipe.steps) {
        if (step.timerSeconds !== undefined) {
          expect(step.timerSeconds).toBeGreaterThanOrEqual(10);
          expect(step.timerSeconds).toBeLessThanOrEqual(7200);
        }
      }
    }
  });
});
