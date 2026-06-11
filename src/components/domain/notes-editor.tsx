"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { saveNote } from "@/lib/actions/recipes";

export function NotesEditor({
  recipeId,
  initialNote,
}: {
  recipeId: string;
  initialNote: string;
}) {
  const t = useTranslations("recipes.detail");
  const [text, setText] = useState(initialNote);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setSaved(false);
        }}
        placeholder={t("notesPlaceholder")}
        rows={3}
        className="w-full rounded-[10px] border-[1.5px] border-border bg-surface px-3.5 py-3 text-sm outline-none focus:border-ring"
      />
      <button
        type="button"
        disabled={isPending || saved}
        onClick={() =>
          startTransition(async () => {
            await saveNote(recipeId, text);
            setSaved(true);
          })
        }
        className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {saved && <Check size={16} />}
        {saved ? t("notesSaved") : t("notesSave")}
      </button>
    </div>
  );
}
