import { useTranslations } from "next-intl";
import { BottomNav, Sidebar } from "@/components/app-shell/nav";
import { ThemeToggle } from "@/components/app-shell/theme-toggle";

function Header() {
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background lg:hidden">
      <div className="mx-auto flex max-w-[430px] items-center justify-between py-1.5 pl-5 pr-2">
        <span className="font-display text-[22px] font-bold tracking-tight text-brand">
          {t("appName")}
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:pl-60">
        <Header />
        <main className="mx-auto w-full max-w-[430px] flex-1 px-5 pb-24 lg:pb-10">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
