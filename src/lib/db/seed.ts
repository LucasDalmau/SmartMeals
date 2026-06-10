import { eq, inArray } from "drizzle-orm";
import type { Db } from "./index";
import * as schema from "./schema";
import { SEED_RECIPES } from "../../data/seed/recipes";
import { DEV_USER_EMAIL } from "../auth";

// Seed idempotente: upsert por clave natural (email, name de ingrediente,
// slug de receta). Las filas hijas de cada receta se regeneran completas,
// pero la receta conserva su id, así favoritos/planes existentes no se rompen.

export async function runSeed(db: Db) {
  await db
    .insert(schema.users)
    .values({ email: DEV_USER_EMAIL, name: "Lucas (dev)" })
    .onConflictDoNothing();

  // ── Maestro de ingredientes ──
  const uniqueIngredients = new Map<
    string,
    { name: string; category: (typeof schema.ingredients.$inferInsert)["category"] }
  >();
  for (const recipe of SEED_RECIPES) {
    for (const ing of recipe.ingredients) {
      uniqueIngredients.set(ing.name, { name: ing.name, category: ing.category });
    }
  }
  await db
    .insert(schema.ingredients)
    .values([...uniqueIngredients.values()])
    .onConflictDoNothing();

  const ingredientRows = await db
    .select()
    .from(schema.ingredients)
    .where(inArray(schema.ingredients.name, [...uniqueIngredients.keys()]));
  const ingredientIdByName = new Map(ingredientRows.map((r) => [r.name, r.id]));

  // ── Recetas ──
  const recipeIdBySlug = new Map<string, string>();

  for (const recipe of SEED_RECIPES) {
    const values = {
      slug: recipe.slug,
      name: recipe.name,
      description: recipe.description,
      category: recipe.category,
      difficulty: recipe.difficulty,
      servingsDefault: recipe.servingsDefault,
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
      protein: recipe.macrosPerServing.protein,
      carbs: recipe.macrosPerServing.carbs,
      fats: recipe.macrosPerServing.fats,
      calories: recipe.macrosPerServing.calories,
      freezable: recipe.freezable,
      tags: recipe.tags,
      mealSlots: recipe.mealSlots,
      ownerId: null,
    };

    const [row] = await db
      .insert(schema.recipes)
      .values(values)
      .onConflictDoUpdate({ target: schema.recipes.slug, set: values })
      .returning({ id: schema.recipes.id });
    recipeIdBySlug.set(recipe.slug, row.id);

    // Filas hijas: regenerar completas para reflejar cambios del seed.
    await db
      .delete(schema.recipeIngredients)
      .where(eq(schema.recipeIngredients.recipeId, row.id));
    await db.delete(schema.steps).where(eq(schema.steps.recipeId, row.id));
    await db
      .delete(schema.prepItems)
      .where(eq(schema.prepItems.recipeId, row.id));

    await db.insert(schema.recipeIngredients).values(
      recipe.ingredients.map((ing, i) => ({
        recipeId: row.id,
        ingredientId: ingredientIdByName.get(ing.name)!,
        amount: ing.amount,
        unit: ing.unit,
        sortOrder: i,
      })),
    );

    await db.insert(schema.steps).values(
      recipe.steps.map((step, i) => ({
        recipeId: row.id,
        order: i + 1,
        text: step.text,
        timerSeconds: step.timerSeconds ?? null,
        canParallelize: step.canParallelize ?? false,
      })),
    );

    if (recipe.prepDependencies.length > 0) {
      await db.insert(schema.prepItems).values(
        recipe.prepDependencies.map((p) => ({
          recipeId: row.id,
          name: p.name,
          action: p.action,
          durationMinutes: p.durationMinutes,
          storageDays: p.storageDays,
          freezable: p.freezable,
        })),
      );
    }
  }

  // ── Variaciones (segunda pasada: necesitan los ids de todas) ──
  for (const recipe of SEED_RECIPES) {
    const variationIds = recipe.variationSlugs.map((slug) => {
      const recipeId = recipeIdBySlug.get(slug);
      if (!recipeId) {
        throw new Error(
          `Receta ${recipe.slug}: variación desconocida "${slug}"`,
        );
      }
      return recipeId;
    });
    await db
      .update(schema.recipes)
      .set({ variationIds })
      .where(eq(schema.recipes.id, recipeIdBySlug.get(recipe.slug)!));
  }
}
