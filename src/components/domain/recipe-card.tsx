"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Snowflake, Star } from "lucide-react";
import type { BrowseRecipe } from "@/lib/queries/recipes";
import { CATEGORY_BG, SLOT_EMOJI } from "@/lib/recipe-meta";

export function RecipeCard({ recipe }: { recipe: BrowseRecipe }) {
  const t = useTranslations("common");

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="mb-2.5 flex min-h-[72px] overflow-hidden rounded-xl bg-surface"
    >
      <div className={`w-[5px] shrink-0 ${CATEGORY_BG[recipe.category]}`} />
      <div className="flex-1 px-3.5 py-3">
        <div className="flex items-start justify-between gap-2">
          <span className="font-display text-[17px] font-semibold leading-tight">
            {recipe.name}
          </span>
          <span className="flex shrink-0 items-center gap-1.5 pt-0.5">
            {recipe.freezable && (
              <Snowflake size={13} className="text-muted-foreground" />
            )}
            {recipe.isFavorite && (
              <Star size={13} className="fill-star text-star" />
            )}
            <span className="text-[11px] text-muted-foreground">
              {t("minutes", { count: recipe.totalMinutes })}
            </span>
          </span>
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          {recipe.protein}g prot · {recipe.calories} kcal
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1">
          {recipe.mealSlots.map((slot) => (
            <span key={slot} className="text-[10px]">
              {SLOT_EMOJI[slot]}
            </span>
          ))}
          {recipe.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold text-brand"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
