import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Star } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getWeekPlan, listEligibleRecipes } from "@/lib/queries/plan";
import { assignSlot, clearSlot } from "@/lib/actions/plan";
import { CATEGORY_BG } from "@/lib/recipe-meta";
import {
  datesOf,
  isValidIsoWeek,
  weekdayName,
  type IsoWeek,
} from "@/lib/week";
import { MEAL_SLOTS, type MealSlot } from "@/types";
import type { RecipeSummary } from "@/lib/queries/plan";
import { ServingsStepper } from "@/components/domain/servings-stepper";

export const dynamic = "force-dynamic";

function RecipeRow({
  recipe,
  isoWeek,
  day,
  slot,
  fromPool,
  badge,
  isFavorite,
  minutesLabel,
}: {
  recipe: RecipeSummary;
  isoWeek: IsoWeek;
  day: number;
  slot: MealSlot;
  fromPool?: boolean;
  badge?: string;
  isFavorite?: boolean;
  minutesLabel: string;
}) {
  return (
    <form
      action={assignSlot.bind(null, {
        isoWeek,
        day,
        slot,
        recipeId: recipe.id,
        fromPool,
      })}
    >
      <button
        type="submit"
        className={`mb-2.5 flex w-full overflow-hidden rounded-xl bg-surface text-left ${
          fromPool ? "ring-2 ring-brand" : ""
        }`}
      >
        <span className={`w-[5px] shrink-0 ${CATEGORY_BG[recipe.category]}`} />
        <span className="flex-1 px-3.5 py-3">
          <span className="block font-display text-[15px] font-semibold leading-tight">
            {recipe.name}
          </span>
          <span className="mt-0.5 block text-[11px] text-muted-foreground">
            {recipe.protein}g prot · {recipe.calories} kcal · {minutesLabel}
          </span>
        </span>
        <span className="flex items-center gap-2 pr-3">
          {isFavorite && <Star size={14} className="fill-star text-star" />}
          {badge && (
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold text-brand">
              {badge}
            </span>
          )}
        </span>
      </button>
    </form>
  );
}

export default async function AssignPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string; day?: string; slot?: string }>;
}) {
  const { week, day: dayParam, slot } = await searchParams;
  const day = Number(dayParam);
  if (
    !week ||
    !isValidIsoWeek(week) ||
    !Number.isInteger(day) ||
    day < 0 ||
    day > 6 ||
    !slot ||
    !MEAL_SLOTS.includes(slot as MealSlot)
  ) {
    notFound();
  }
  const mealSlot = slot as MealSlot;

  const [t, tc, user] = await Promise.all([
    getTranslations("plan.assign"),
    getTranslations("common"),
    getCurrentUser(),
  ]);
  const [plan, eligible] = await Promise.all([
    getWeekPlan(user.id, week),
    listEligibleRecipes(user.id, mealSlot),
  ]);

  const current = plan.entries.find((e) => e.day === day && e.slot === mealSlot);
  const poolEligible = plan.pool.filter((p) =>
    p.recipe.mealSlots.includes(mealSlot),
  );
  const date = datesOf(week)[day];
  const minutes = (r: RecipeSummary) =>
    tc("minutes", { count: r.prepTimeMinutes + r.cookTimeMinutes });

  return (
    <div className="pt-1">
      <Link
        href={`/plan?week=${week}`}
        className="flex min-h-11 items-center gap-1.5 text-sm font-semibold"
      >
        <ArrowLeft size={18} />
        {weekdayName(date)} · {tc(`slots.${mealSlot}`)}
      </Link>

      {/* Entrada actual: porciones + quitar */}
      {current && (
        <div className="mt-3 rounded-xl bg-surface p-3.5">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            {t("current")}
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`h-8 w-[3px] shrink-0 rounded-sm ${CATEGORY_BG[current.recipe.category]}`}
            />
            <span className="flex-1 font-display text-[15px] font-semibold">
              {current.recipe.name}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t("servings")}
            </span>
            <ServingsStepper
              isoWeek={week}
              day={day}
              slot={mealSlot}
              servings={current.servings}
            />
          </div>
          <form
            action={clearSlot.bind(null, { isoWeek: week, day, slot: mealSlot })}
            className="mt-3"
          >
            <button
              type="submit"
              className="min-h-11 w-full rounded-[10px] border-[1.5px] border-destructive text-sm font-semibold text-destructive"
            >
              {t("remove")}
            </button>
          </form>
        </div>
      )}

      {/* Desde el pool */}
      {poolEligible.length > 0 && (
        <section className="mt-4">
          <h2 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            {t("fromPool")}
          </h2>
          {poolEligible.map((p) => (
            <RecipeRow
              key={p.id}
              recipe={p.recipe}
              isoWeek={week}
              day={day}
              slot={mealSlot}
              fromPool
              badge={t("poolBadge")}
              minutesLabel={minutes(p.recipe)}
            />
          ))}
          <div className="my-3 h-px bg-border" />
        </section>
      )}

      {/* Todas las elegibles */}
      <section className="mb-6 mt-4">
        <h2 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {t("all")}
        </h2>
        {eligible.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {t("empty")}
          </p>
        )}
        {eligible.map((r) => (
          <RecipeRow
            key={r.id}
            recipe={r}
            isoWeek={week}
            day={day}
            slot={mealSlot}
            isFavorite={r.isFavorite}
            minutesLabel={minutes(r)}
          />
        ))}
      </section>
    </div>
  );
}
