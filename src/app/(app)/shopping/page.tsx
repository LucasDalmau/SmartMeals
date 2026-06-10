import { getTranslations } from "next-intl/server";
import { PagePlaceholder } from "@/components/domain/page-placeholder";

export default async function ShoppingPage() {
  const t = await getTranslations("shopping");
  return (
    <PagePlaceholder
      title={t("title")}
      emoji="🛒"
      empty={t("empty")}
      phase={t("phase")}
    />
  );
}
