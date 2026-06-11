import { getTranslations } from "next-intl/server";
import { ClipboardList, X } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getWeekPlan } from "@/lib/queries/plan";
import { togglePool } from "@/lib/actions/plan";
import { personalMacros, sumMacros } from "@/lib/scaling";
import { CATEGORY_BG } from "@/lib/recipe-meta";
import {
  currentIsoWeek,
  datesOf,
  isValidIsoWeek,
  todayIndexIn,
} from "@/lib/week";
import { DayCard } from "@/components/domain/day-card";
import { WeekNav } from "@/components/domain/week-nav";

export const dynamic = "force-dynamic";

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const { week } = await searchParams;
  const isoWeek =
    week && isValidIsoWeek(week) ? week : currentIsoWeek();

  const [t, tc, user] = await Promise.all([
    getTranslations("plan"),
    getTranslations("common"),
    getCurrentUser(),
  ]);
  const plan = await getWeekPlan(user.id, isoWeek);

  const dates = datesOf(isoWeek);
  const todayIdx = todayIndexIn(isoWeek);
  const entriesByDay = (day: number) =>
    plan.entries.filter((e) => e.day === day);

  const weekMacros = sumMacros(
    plan.entries.map((e) =>
      personalMacros(
        {
          protein: e.recipe.protein,
          carbs: e.recipe.carbs,
          fats: e.recipe.fats,
          calories: e.recipe.calories,
        },
        e.recipe.category,
        e.servings,
      ),
    ),
  );
  const mealCount = plan.entries.length;

  return (
    <div className="pt-4">
      <h1 className="mb-3 font-display text-[22px] font-semibold">
        {t("title")}
      </h1>

      <WeekNav isoWeek={isoWeek} />

      {/* Pool de prep dominical */}
      {plan.pool.length > 0 && (
        <div className="mb-4 rounded-xl bg-brand-soft p-3.5">
          <div className="mb-1 flex items-center gap-2.5">
            <ClipboardList size={18} className="shrink-0 text-brand" />
            <div className="flex-1">
              <p className="text-xs font-bold text-brand">{t("pool.title")}</p>
              <p className="text-[11px] text-brand-mid">
                {t("pool.count", { count: plan.pool.length })}
              </p>
            </div>
          </div>
          <ul className="mt-2 space-y-1.5">
            {plan.pool.map((p) => (
              <li key={p.id} className="flex items-center gap-2">
                <span
                  className={`h-6 w-[3px] shrink-0 rounded-sm ${CATEGORY_BG[p.recipe.category]}`}
                />
                <span className="flex-1 truncate text-[13px] font-medium">
                  {p.recipe.name}
                </span>
                <form
                  action={togglePool.bind(null, {
                    isoWeek,
                    recipeId: p.recipe.id,
                  })}
                >
                  <button
                    type="submit"
                    aria-label={t("pool.remove")}
                    className="flex size-8 items-center justify-center rounded-md text-brand-mid hover:bg-surface-2"
                  >
                    <X size={14} />
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hero de hoy */}
      {todayIdx !== null && (
        <div className="mb-5">
          <DayCard
            isoWeek={isoWeek}
            dayIdx={todayIdx}
            date={dates[todayIdx]}
            entries={entriesByDay(todayIdx)}
            isToday
            hero
          />
        </div>
      )}

      {/* Semana completa */}
      <div className="space-y-4">
        {dates.map((date, day) =>
          day === todayIdx ? null : (
            <DayCard
              key={day}
              isoWeek={isoWeek}
              dayIdx={day}
              date={date}
              entries={entriesByDay(day)}
              isToday={false}
            />
          ),
        )}
      </div>

      {/* Resumen semanal */}
      <div className="mb-6 mt-5 rounded-xl bg-surface p-4">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {t("summary.title")}
        </p>
        <p className="mb-3 text-[11px] text-muted-foreground">
          {t("summary.meals", { count: mealCount })}
        </p>
        <div className="grid grid-cols-4 gap-2 text-center">
          {(
            [
              ["protein", weekMacros.protein, "text-brand"],
              ["carbs", weekMacros.carbs, "text-cat-pasta"],
              ["fats", weekMacros.fats, "text-cat-two"],
              ["calories", weekMacros.calories, "text-destructive"],
            ] as const
          ).map(([key, value, color]) => (
            <div key={key}>
              <div className={`text-xl font-bold ${color}`}>
                {Math.round(value)}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground">
                {tc(`macros.${key}`)}
              </div>
            </div>
          ))}
        </div>
        {mealCount > 0 && todayIdx !== null && (
          <p className="mt-3 border-t border-border pt-3 text-[11px] text-muted-foreground">
            {t("summary.dailyAvg")}:{" "}
            <strong className="text-foreground">
              {Math.round(weekMacros.protein / 7)}g prot ·{" "}
              {Math.round(weekMacros.calories / 7)} kcal
            </strong>
          </p>
        )}
      </div>
    </div>
  );
}
