"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ShoppingCart,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/app-shell/theme-toggle";

const NAV_ITEMS = [
  { key: "plan", href: "/plan", icon: CalendarDays },
  { key: "recipes", href: "/recipes", icon: BookOpen },
  { key: "shopping", href: "/shopping", icon: ShoppingCart },
  { key: "macros", href: "/macros", icon: BarChart3 },
  { key: "profile", href: "/profile", icon: User },
] as const;

function useActive() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const t = useTranslations("nav");
  const isActive = useActive();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="mx-auto flex max-w-[430px]">
        {NAV_ITEMS.map(({ key, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={key}
              href={href}
              className={cn(
                "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 pt-2 pb-3 text-[10px]",
                active
                  ? "font-bold text-brand"
                  : "font-normal text-muted-foreground",
              )}
            >
              <Icon size={22} strokeWidth={active ? 2.4 : 2} />
              {t(key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Sidebar() {
  const t = useTranslations("nav");
  const isActive = useActive();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="px-6 py-5">
        <span className="font-display text-[22px] font-bold tracking-tight text-brand">
          SmartMeals
        </span>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ key, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={key}
              href={href}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-sm",
                active
                  ? "bg-brand-soft font-semibold text-brand"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
              )}
            >
              <Icon size={20} />
              {t(key)}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-3 pb-4">
        <ThemeToggle />
      </div>
    </aside>
  );
}
