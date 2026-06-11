import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";
import type { PlanEntryView } from "@/lib/queries/plan";
import { personalMacros } from "@/lib/scaling";
import { CATEGORY_BG, SLOT_EMOJI, SLOT_TEXT } from "@/lib/recipe-meta";
import { dayNumber, weekdayName, type IsoWeek } from "@/lib/week";
import { MEAL_SLOTS } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  isoWeek: IsoWeek;
  dayIdx: number;
  date: Date;
  entries: PlanEntryView[];
  isToday: boolean;
  hero?: boolean;
};

export async function DayCard({
  isoWeek,
  dayIdx,
  date,
  entries,
  isToday,
  hero = false,
}: Props) {
  const t = await getTranslations("plan");
  const tc = await getTranslations("common");
  const bySlot = new Map(entries.map((e) => [e.slot, e]));

  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2">
        <span
          className={cn(
            "font-display text-[15px] font-semibold",
            isToday && "text-brand",
            hero && "text-[17px]",
          )}
        >
          {weekdayName(date)} {dayNumber(date)}
        </span>
        {isToday && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
            {t("today")}
          </span>
        )}
      </div>

      <div
        className={cn(
          "overflow-hidden rounded-xl bg-surface",
          hero && "ring-2 ring-brand",
        )}
      >
        {MEAL_SLOTS.map((slot, i) => {
          const entry = bySlot.get(slot);
          const macros = entry
            ? personalMacros(
                {
                  protein: entry.recipe.protein,
                  carbs: entry.recipe.carbs,
                  fats: entry.recipe.fats,
                  calories: entry.recipe.calories,
                },
                entry.recipe.category,
                entry.servings,
              )
            : null;
          return (
            <Link
              key={slot}
              href={`/plan/assign?week=${isoWeek}&day=${dayIdx}&slot=${slot}`}
              className={cn(
                "flex min-h-[52px] items-center gap-2.5 px-3 py-2",
                i < MEAL_SLOTS.length - 1 && "border-b border-border",
              )}
            >
              <span
                className={cn(
                  "w-[76px] shrink-0 text-[10px] font-bold uppercase tracking-wide",
                  SLOT_TEXT[slot],
                )}
              >
                {SLOT_EMOJI[slot]} {tc(`slots.${slot}`)}
              </span>
              {entry && macros ? (
                <span className="flex flex-1 items-center gap-2">
                  <span
                    className={`h-8 w-[3px] shrink-0 rounded-sm ${CATEGORY_BG[entry.recipe.category]}`}
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-display text-[13px] font-semibold leading-tight">
                      {entry.recipe.name}
                      {entry.servings !== entry.recipe.servingsDefault && (
                        <span className="ml-1.5 font-sans text-[10px] font-bold text-brand">
                          {t("servingsShort", { count: entry.servings })}
                        </span>
                      )}
                    </span>
                    <span className="block text-[10px] text-muted-foreground">
                      {macros.protein}g P · {macros.calories} kcal
                    </span>
                  </span>
                </span>
              ) : (
                <span className="flex flex-1 items-center gap-1.5 text-muted-foreground">
                  <span className="flex size-[22px] items-center justify-center rounded-md border-[1.5px] border-dashed border-border">
                    <Plus size={12} />
                  </span>
                  <span className="text-xs">{t("emptySlot")}</span>
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
