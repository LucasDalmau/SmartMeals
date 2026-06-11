import { and, eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import type { IsoWeek } from "@/lib/week";

// Resumen de receta que necesitan las vistas del plan (slots, pool, picker).
const RECIPE_SUMMARY = {
  id: true,
  slug: true,
  name: true,
  category: true,
  servingsDefault: true,
  prepTimeMinutes: true,
  cookTimeMinutes: true,
  protein: true,
  carbs: true,
  fats: true,
  calories: true,
  mealSlots: true,
  freezable: true,
} as const;

export async function getWeekPlan(userId: string, isoWeek: IsoWeek) {
  const db = await getDb();
  const plan = await db.query.weekPlans.findFirst({
    where: and(
      eq(schema.weekPlans.userId, userId),
      eq(schema.weekPlans.isoWeek, isoWeek),
    ),
    with: {
      entries: { with: { recipe: { columns: RECIPE_SUMMARY } } },
      pool: { with: { recipe: { columns: RECIPE_SUMMARY } } },
    },
  });
  return {
    isoWeek,
    entries: plan?.entries ?? [],
    pool: plan?.pool ?? [],
  };
}

export type WeekPlanView = Awaited<ReturnType<typeof getWeekPlan>>;
export type PlanEntryView = WeekPlanView["entries"][number];
export type PoolEntryView = WeekPlanView["pool"][number];
export type RecipeSummary = PlanEntryView["recipe"];

/** Recetas elegibles para un slot, con flag de favorita (favoritas primero). */
export async function listEligibleRecipes(
  userId: string,
  slot: (typeof schema.recipes.$inferSelect)["mealSlots"][number],
) {
  const db = await getDb();
  const [recipes, favorites] = await Promise.all([
    db.query.recipes.findMany({ columns: RECIPE_SUMMARY }),
    db
      .select({ recipeId: schema.favorites.recipeId })
      .from(schema.favorites)
      .where(eq(schema.favorites.userId, userId)),
  ]);
  const favoriteIds = new Set(favorites.map((f) => f.recipeId));
  return recipes
    .filter((r) => r.mealSlots.includes(slot))
    .map((r) => ({ ...r, isFavorite: favoriteIds.has(r.id) }))
    .sort(
      (a, b) =>
        Number(b.isFavorite) - Number(a.isFavorite) ||
        a.name.localeCompare(b.name, "es"),
    );
}

/** ¿La receta está en el pool de la semana? (para el botón del detalle) */
export async function isInPool(
  userId: string,
  isoWeek: IsoWeek,
  recipeId: string,
): Promise<boolean> {
  const db = await getDb();
  const plan = await db.query.weekPlans.findFirst({
    where: and(
      eq(schema.weekPlans.userId, userId),
      eq(schema.weekPlans.isoWeek, isoWeek),
    ),
    with: { pool: { where: eq(schema.poolEntries.recipeId, recipeId) } },
  });
  return (plan?.pool.length ?? 0) > 0;
}
