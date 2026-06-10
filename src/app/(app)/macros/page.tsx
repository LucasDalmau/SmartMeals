import { getTranslations } from "next-intl/server";
import { PagePlaceholder } from "@/components/domain/page-placeholder";

export default async function MacrosPage() {
  const t = await getTranslations("macros");
  return (
    <PagePlaceholder
      title={t("title")}
      emoji="📊"
      empty={t("empty")}
      phase={t("phase")}
    />
  );
}
