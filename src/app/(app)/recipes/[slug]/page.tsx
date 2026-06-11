import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Clock, Flame, Snowflake, Timer } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getRecipeDetail } from "@/lib/queries/recipes";
import { CATEGORY_BG, SLOT_EMOJI } from "@/lib/recipe-meta";
import { FavoriteButton } from "@/components/domain/favorite-button";
import { NotesEditor } from "@/components/domain/notes-editor";

export const dynamic = "force-dynamic";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [t, tc, user] = await Promise.all([
    getTranslations("recipes.detail"),
    getTranslations("common"),
    getCurrentUser(),
  ]);
  const recipe = await getRecipeDetail(slug, user.id);
  if (!recipe) notFound();

  const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div>
      {/* Barra superior: volver + favorito */}
      <div className="flex items-center justify-between py-1">
        <Link
          href="/recipes"
          className="flex min-h-11 items-center gap-1.5 text-sm font-semibold"
        >
          <ArrowLeft size={18} />
          {tc("back")}
        </Link>
        <FavoriteButton recipeId={recipe.id} isFavorite={recipe.isFavorite} />
      </div>

      {/* Hero con color de categoría, full-bleed */}
      <div className={`-mx-5 px-5 pb-5 pt-6 ${CATEGORY_BG[recipe.category]}`}>
        <div className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.5px] text-white/60">
          {tc(`categories.${recipe.category}`)}
          {recipe.freezable && (
            <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 normal-case tracking-normal text-white/90">
              <Snowflake size={10} />
              {t("freezable")}
            </span>
          )}
        </div>
        <h1 className="font-display text-[28px] font-bold leading-tight text-white">
          {recipe.name}
        </h1>
        {recipe.description && (
          <p className="mt-2 text-[13px] text-white/75">{recipe.description}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-xs text-white/90">
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {tc("minutes", { count: totalMinutes })}
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} />
            {recipe.calories} kcal
          </span>
          <span className="font-semibold">
            {"⬥".repeat(recipe.difficulty)}{" "}
            {tc(`difficulty.${recipe.difficulty}`)}
          </span>
        </div>
      </div>

      {/* Macros por porción */}
      <div className="mt-4 flex gap-2">
        {(
          [
            ["protein", recipe.protein, "text-brand"],
            ["carbs", recipe.carbs, "text-cat-pasta"],
            ["fats", recipe.fats, "text-cat-two"],
          ] as const
        ).map(([key, value, color]) => (
          <div
            key={key}
            className="flex-1 rounded-[10px] bg-surface px-2.5 py-2 text-center"
          >
            <div className={`text-xl font-bold ${color}`}>{value}</div>
            <div className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground">
              {tc(`macros.${key}`)}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-1.5 text-[11px] text-muted-foreground">
        {t("perServing")} · {t("servings", { count: recipe.servingsDefault })}
      </p>

      {/* Apto para */}
      <section className="mt-4">
        <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {t("suitableFor")}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {recipe.mealSlots.map((slot) => (
            <span
              key={slot}
              className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand"
            >
              {SLOT_EMOJI[slot]} {tc(`slots.${slot}`)}
            </span>
          ))}
        </div>
      </section>

      {/* Ingredientes */}
      <section className="mt-5">
        <h2 className="mb-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {t("ingredients")}
        </h2>
        {recipe.recipeIngredients.map((ri) => (
          <div
            key={ri.id}
            className="flex min-h-11 items-center justify-between border-b border-border py-2.5"
          >
            <span className="text-sm">{ri.ingredient.name}</span>
            <span className="text-[13px] font-semibold text-muted-foreground">
              {ri.amount} {tc(`units.${ri.unit}`, { count: ri.amount })}
            </span>
          </div>
        ))}
      </section>

      {/* Preparación */}
      <section className="mt-5">
        <h2 className="mb-3 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {t("steps")}
        </h2>
        {recipe.steps.map((step) => (
          <div key={step.id} className="mb-4 flex gap-3">
            <div
              className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold text-white ${CATEGORY_BG[recipe.category]}`}
            >
              {step.order}
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed">{step.text}</p>
              {step.timerSeconds !== null && (
                <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">
                  <Timer size={12} />
                  {step.timerSeconds >= 60
                    ? tc("minutes", {
                        count: Math.round(step.timerSeconds / 60),
                      })
                    : tc("seconds", { count: step.timerSeconds })}
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Variaciones */}
      {recipe.variations.length > 0 && (
        <section className="mt-5">
          <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            {t("variations")}
          </h2>
          {recipe.variations.map((v) => (
            <Link
              key={v.id}
              href={`/recipes/${v.slug}`}
              className="mb-2.5 flex min-h-14 overflow-hidden rounded-xl bg-surface"
            >
              <div className={`w-[5px] shrink-0 ${CATEGORY_BG[v.category]}`} />
              <div className="flex-1 px-3.5 py-3">
                <div className="font-display text-[15px] font-semibold leading-tight">
                  {v.name}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {v.protein}g prot · {v.calories} kcal ·{" "}
                  {tc("minutes", {
                    count: v.prepTimeMinutes + v.cookTimeMinutes,
                  })}
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* Notas del usuario */}
      <section className="mb-6 mt-5">
        <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {t("notes")}
        </h2>
        <NotesEditor recipeId={recipe.id} initialNote={recipe.note} />
      </section>
    </div>
  );
}
