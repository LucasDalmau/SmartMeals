import { getTranslations } from "next-intl/server";
import { PagePlaceholder } from "@/components/domain/page-placeholder";

export default async function PlanPage() {
  const t = await getTranslations("plan");
  return (
    <PagePlaceholder
      title={t("title")}
      emoji="📅"
      empty={t("empty")}
      phase={t("phase")}
    />
  );
}
