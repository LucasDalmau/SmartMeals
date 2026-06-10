"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

// true recién después de hidratar; evita mismatch servidor/cliente del ícono.
const useHydrated = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("common");
  const hydrated = useHydrated();

  return (
    <button
      type="button"
      aria-label={t("toggleTheme")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex size-11 items-center justify-center rounded-[10px] text-muted-foreground hover:bg-surface-2"
    >
      {hydrated &&
        (resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
    </button>
  );
}
