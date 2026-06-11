"use client";

import { useOptimistic, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Check, ClipboardList } from "lucide-react";
import { togglePool } from "@/lib/actions/plan";
import type { IsoWeek } from "@/lib/week";
import { cn } from "@/lib/utils";

export function PoolToggleButton({
  recipeId,
  isoWeek,
  inPool,
}: {
  recipeId: string;
  isoWeek: IsoWeek;
  inPool: boolean;
}) {
  const t = useTranslations("plan.pool");
  const [isPending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(inPool);

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          setOptimistic(!optimistic);
          await togglePool({ isoWeek, recipeId });
        })
      }
      className={cn(
        "flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] text-sm font-semibold",
        optimistic
          ? "bg-brand-soft text-brand"
          : "bg-primary text-primary-foreground",
      )}
    >
      {optimistic ? <Check size={16} /> : <ClipboardList size={16} />}
      {optimistic ? t("inPool") : t("add")}
    </button>
  );
}
