"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Search, Snowflake } from "lucide-react";
import type { RecipeCategory } from "@/types";
import type { BrowseRecipe } from "@/lib/queries/recipes";
import { CATEGORY_ORDER } from "@/lib/recipe-meta";
import { cn } from "@/lib/utils";
import { RecipeCard } from "./recipe-card";

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function RecipeBrowser({ recipes }: { recipes: BrowseRecipe[] }) {
  const t = useTranslations("recipes");
  const tc = useTranslations("common");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<RecipeCategory | "all">("all");
  const [freezerOnly, setFreezerOnly] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<RecipeCategory>>(new Set());

  const filtered = useMemo(() => {
    const q = normalize(search.trim());
    return recipes.filter((r) => {
      if (freezerOnly && !r.freezable) return false;
      if (category !== "all" && r.category !== category) return false;
      if (q === "") return true;
      return (
        normalize(r.name).includes(q) ||
        r.ingredientNames.some((name) => normalize(name).includes(q))
      );
    });
  }, [recipes, search, category, freezerOnly]);

  // Favoritas primero dentro de cada categoría (CLAUDE.md, feature 11).
  const byCategory = useMemo(() => {
    const groups = new Map<RecipeCategory, BrowseRecipe[]>();
    for (const cat of CATEGORY_ORDER) groups.set(cat, []);
    for (const r of filtered) groups.get(r.category)?.push(r);
    for (const list of groups.values()) {
      list.sort(
        (a, b) =>
          Number(b.isFavorite) - Number(a.isFavorite) ||
          a.name.localeCompare(b.name, "es"),
      );
    }
    return groups;
  }, [filtered]);

  const toggleCollapsed = (cat: RecipeCategory) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });

  return (
    <div>
      <div className="relative mb-3">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="h-11 w-full rounded-[10px] border-[1.5px] border-border bg-surface pl-10 pr-4 text-sm outline-none focus:border-ring"
        />
      </div>

      <div className="scrollbar-none -mx-5 mb-2 flex gap-1.5 overflow-x-auto px-5 pb-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={cn(
            "h-8 shrink-0 rounded-full px-3.5 text-xs font-semibold",
            category === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-surface text-muted-foreground",
          )}
        >
          {t("all")}
        </button>
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(category === cat ? "all" : cat)}
            className={cn(
              "h-8 shrink-0 rounded-full px-3.5 text-xs font-semibold",
              category === cat
                ? "bg-primary text-primary-foreground"
                : "bg-surface text-muted-foreground",
            )}
          >
            {tc(`categories.${cat}`)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setFreezerOnly((v) => !v)}
          className={cn(
            "flex h-8 shrink-0 items-center gap-1 rounded-full px-3.5 text-xs font-semibold",
            freezerOnly
              ? "bg-primary text-primary-foreground"
              : "bg-surface text-muted-foreground",
          )}
        >
          <Snowflake size={12} />
          {t("freezerFilter")}
        </button>
      </div>

      <p className="mb-3 text-[11px] text-muted-foreground">
        {t("results", { count: filtered.length })}
      </p>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-xl bg-surface px-6 py-12 text-center">
          <span className="text-[32px]">🔍</span>
          <p className="text-sm font-medium">{t("noResults")}</p>
          <p className="text-xs text-muted-foreground">{t("noResultsHint")}</p>
        </div>
      )}

      {CATEGORY_ORDER.map((cat) => {
        const group = byCategory.get(cat) ?? [];
        if (group.length === 0) return null;
        const isCollapsed = collapsed.has(cat);
        return (
          <section key={cat} className="mb-2">
            <button
              type="button"
              onClick={() => toggleCollapsed(cat)}
              className="flex min-h-11 w-full items-center justify-between py-2"
            >
              <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                {tc(`categories.${cat}`)} · {group.length}
              </span>
              <ChevronDown
                size={16}
                className={cn(
                  "text-muted-foreground transition-transform",
                  isCollapsed && "-rotate-90",
                )}
              />
            </button>
            {!isCollapsed && group.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </section>
        );
      })}
    </div>
  );
}
