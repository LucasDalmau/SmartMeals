"use client";

import { useOptimistic, useTransition } from "react";
import { Star } from "lucide-react";
import { toggleFavorite } from "@/lib/actions/recipes";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  recipeId,
  isFavorite,
}: {
  recipeId: string;
  isFavorite: boolean;
}) {
  const [, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(isFavorite);

  return (
    <button
      type="button"
      aria-pressed={optimistic}
      onClick={() =>
        startTransition(async () => {
          setOptimistic(!optimistic);
          await toggleFavorite(recipeId);
        })
      }
      className="flex size-11 items-center justify-center rounded-[10px] hover:bg-surface-2"
    >
      <Star
        size={20}
        className={cn(
          optimistic ? "fill-star text-star" : "text-muted-foreground",
        )}
      />
    </button>
  );
}
