import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { listRecipesForBrowse } from "@/lib/queries/recipes";
import { RecipeBrowser } from "@/components/domain/recipe-browser";

// Lee de la DB en cada request (favoritos cambian por usuario).
export const dynamic = "force-dynamic";

export default async function RecipesPage() {
  const t = await getTranslations("recipes");
  const user = await getCurrentUser();
  const recipes = await listRecipesForBrowse(user.id);

  return (
    <div className="pt-4">
      <h1 className="mb-3 font-display text-[22px] font-semibold">
        {t("title")}
      </h1>
      <RecipeBrowser recipes={recipes} />
    </div>
  );
}
