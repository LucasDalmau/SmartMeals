import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addWeeks, formatWeekRange, type IsoWeek } from "@/lib/week";

export async function WeekNav({ isoWeek }: { isoWeek: IsoWeek }) {
  const t = await getTranslations("plan");

  return (
    <div className="mb-4 flex items-center justify-between">
      <Link
        href={`/plan?week=${addWeeks(isoWeek, -1)}`}
        aria-label={t("prevWeek")}
        className="flex size-11 items-center justify-center rounded-[10px] text-muted-foreground hover:bg-surface-2"
      >
        <ChevronLeft size={20} />
      </Link>
      <span className="text-sm font-semibold">
        {t("weekLabel", { range: formatWeekRange(isoWeek) })}
      </span>
      <Link
        href={`/plan?week=${addWeeks(isoWeek, 1)}`}
        aria-label={t("nextWeek")}
        className="flex size-11 items-center justify-center rounded-[10px] text-muted-foreground hover:bg-surface-2"
      >
        <ChevronRight size={20} />
      </Link>
    </div>
  );
}
