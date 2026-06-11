"use client";

import { useOptimistic, useTransition } from "react";
import { Minus, Plus } from "lucide-react";
import { updateEntryServings } from "@/lib/actions/plan";
import type { IsoWeek } from "@/lib/week";

type Props = {
  isoWeek: IsoWeek;
  day: number;
  slot: string;
  servings: number;
};

export function ServingsStepper({ isoWeek, day, slot, servings }: Props) {
  const [isPending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(servings);

  const change = (delta: number) => {
    const next = Math.min(12, Math.max(1, optimistic + delta));
    if (next === optimistic) return;
    startTransition(async () => {
      setOptimistic(next);
      await updateEntryServings({ isoWeek, day, slot, servings: next });
    });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => change(-1)}
        disabled={isPending || optimistic <= 1}
        className="flex size-11 items-center justify-center rounded-[10px] bg-surface-2 disabled:opacity-40"
      >
        <Minus size={16} />
      </button>
      <span className="min-w-8 text-center text-lg font-bold">
        {optimistic}
      </span>
      <button
        type="button"
        onClick={() => change(1)}
        disabled={isPending || optimistic >= 12}
        className="flex size-11 items-center justify-center rounded-[10px] bg-surface-2 disabled:opacity-40"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
