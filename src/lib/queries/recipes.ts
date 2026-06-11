import { and, eq, inArray } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";

// Shape liviano para el browse: el filtrado (búsqueda, categoría, freezer)
// es client-side — con ~50 recetas es más rápido que un roundtrip por tecla.
export type BrowseRecipe = {
  id: string;
  slug: string;
  name: string;
  category: (typeof schema.recipes.$inferSelect)["category"];
  difficulty: number;
  totalMinutes: number;
  protein: number;
  calories: number;
  freezable: boolean;
  tags: string[];
  mealSlots: (typeof schema.recipes.$inferSelect)["mealSlots"];
  isFavorite: boolean;
  ingredientNames: string[];
};

export async function listRecipesForBrowse(
  userId: string,
): Promise<BrowseRecipe[]> {
  const db = await getDb();

  const [recipes, favorites] = await Promise.all([
    db.query.recipes.findMany({
      with: {
        recipeIngredients: { with: { ingredient: true } },
      },
    }),
    db
      .select({ recipeId: schema.favorites.recipeId })
      .from(schema.favorites)
      .where(eq(schema.favorites.userId, userId)),
  ]);
  const favoriteIds = new Set(favorites.map((f) => f.recipeId));

  return recipes.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    category: r.category,
    difficulty: r.difficulty,
    totalMinutes: r.prepTimeMinutes + r.cookTimeMinutes,
    protein: r.protein,
    calories: r.calories,
    freezable: r.freezable,
    tags: r.tags,
    mealSlots: r.mealSlots,
    isFavorite: favoriteIds.has(r.id),
    ingredientNames: r.recipeIngredients.map((ri) => ri.ingredient.name),
  }));
}

export async function getRecipeDetail(slug: string, userId: string) {
  const db = await getDb();

  const recipe = await db.query.recipes.findFirst({
    where: eq(schema.recipes.slug, slug),
    with: {
      recipeIngredients: {
        with: { ingredient: true },
        orderBy: (ri, { asc }) => [asc(ri.sortOrder)],
      },
      steps: { orderBy: (s, { asc }) => [asc(s.order)] },
      prepItems: true,
    },
  });
  if (!recipe) return null;

  const [favorite, note, variations] = await Promise.all([
    db.query.favorites.findFirst({
      where: and(
        eq(schema.favorites.userId, userId),
        eq(schema.favorites.recipeId, recipe.id),
      ),
    }),
    db.query.recipeNotes.findFirst({
      where: and(
        eq(schema.recipeNotes.userId, userId),
        eq(schema.recipeNotes.recipeId, recipe.id),
      ),
    }),
    recipe.variationIds.length > 0
      ? db
          .select({
            id: schema.recipes.id,
            slug: schema.recipes.slug,
            name: schema.recipes.name,
            category: schema.recipes.category,
            protein: schema.recipes.protein,
            calories: schema.recipes.calories,
            prepTimeMinutes: schema.recipes.prepTimeMinutes,
            cookTimeMinutes: schema.recipes.cookTimeMinutes,
          })
          .from(schema.recipes)
          .where(inArray(schema.recipes.id, recipe.variationIds))
      : Promise.resolve([]),
  ]);

  return {
    ...recipe,
    isFavorite: Boolean(favorite),
    note: note?.text ?? "",
    variations,
  };
}

export type RecipeDetail = NonNullable<Awaited<ReturnType<typeof getRecipeDetail>>>;
