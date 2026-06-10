// Convierte las recetas de la v2 (src/data/legacy/meals-v2.js) al schema v3 y
// genera src/data/seed/legacy-recipes.ts — un archivo COMMITEADO y revisable.
// Reglas deterministas documentadas en cada función; lo que es estimación
// (timers, slots, freezable) queda a revisión de Lucas en el archivo generado.
// Uso: npm run db:import-legacy

import { writeFileSync } from "node:fs";
import type {
  IngredientCategory,
  MealSlot,
  RecipeCategory,
  SeedIngredient,
  SeedPrepItem,
  SeedRecipe,
  SeedStep,
  Unit,
} from "../src/types";
import { DINNERS, SNACKS } from "../src/data/legacy/meals-v2.js";

type LegacyIngredient = { name: string; qty: number; unit: string; cat: string };
type LegacyDinner = {
  id: number;
  name: string;
  cat: string;
  time: string;
  sv: number;
  diff: number;
  macros: { prot: number; carbs: number; fat: number; cal: number };
  skill: string;
  prep: string[];
  allIngredients: LegacyIngredient[];
  steps: string[];
  desc?: string;
};
type LegacySnack = {
  id: string;
  name: string;
  when: string;
  macros: { prot: number; carbs: number; fat: number; cal: number };
  desc: string;
  allIngredients: LegacyIngredient[];
};

// Igual dish que "tostadas-huevo-palta" del seed nuevo — se omite.
const SKIP_IDS = new Set(["s8"]);

const UNIT_MAP: Record<string, Unit> = {
  g: "g",
  ml: "ml",
  L: "l",
  u: "unit",
  cda: "tbsp",
  cdta: "tsp",
  dientes: "clove",
  rebanadas: "slice",
};

const INGREDIENT_CAT_MAP: Record<string, IngredientCategory> = {
  Proteínas: "protein",
  Verduras: "produce",
  Carbs: "pantry",
  Despensa: "pantry",
  Lácteos: "dairy",
};

// Nombres v2 → nombre canónico del maestro (evita "Huevo" y "Huevos" duplicados)
const RENAMES: Record<string, string> = {
  Huevos: "Huevo",
  "Tomates triturados": "Tomate triturado",
};

const CUISINE_TAG: Record<string, string> = {
  chinese: "asiática",
  normal: "clásico",
  mexican: "mexicana",
  mediterranean: "mediterránea",
  american: "americana",
  pareja: "para dos",
};

// La única receta v2 que congela bien entera (guisos/salsas; el resto es
// salteado fresco). Revisable.
const FREEZABLE_NAMES = new Set(["Pasta Bolognesa"]);

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapIngredient(ing: LegacyIngredient): SeedIngredient {
  const unit = UNIT_MAP[ing.unit];
  if (!unit) throw new Error(`Unidad desconocida: ${ing.unit} (${ing.name})`);
  const name = RENAMES[ing.name] ?? ing.name;
  const category: IngredientCategory = /congelad/i.test(name)
    ? "frozen"
    : (INGREDIENT_CAT_MAP[ing.cat] ?? "other");
  return { name, amount: ing.qty, unit, category };
}

// Protein-based, no cuisine-based: la cocina va a tags.
function mapCategory(d: LegacyDinner): RecipeCategory {
  if (d.cat === "pareja") return "for-two";
  const ingredients = d.allIngredients.map((i) => i.name.toLowerCase()).join(" ");
  const name = d.name.toLowerCase();
  if (/fideos|pasta|spaghetti|macarrones|penne|fusilli/.test(`${name} ${ingredients}`))
    return "pasta";
  if (/pollo/.test(ingredients)) return "poultry";
  if (/carne|bife/.test(ingredients)) return "beef";
  return "vegetarian";
}

// Extrae el timer del texto del paso: "3 min", "30seg", "3-4 min" (toma el mayor).
function extractTimer(text: string): number | undefined {
  const match = text.match(/(\d+)(?:\s*[-–]\s*(\d+))?\s*(min|seg)/i);
  if (!match) return undefined;
  const value = Math.max(Number(match[1]), Number(match[2] ?? 0));
  return match[3].toLowerCase() === "min" ? value * 60 : value;
}

function mapStep(text: string): SeedStep {
  const timerSeconds = extractTimer(text);
  const canParallelize = /horno|herv|reducir|reposar|gratinar|tapar/i.test(text);
  return {
    text,
    ...(timerSeconds !== undefined && timerSeconds >= 10
      ? { timerSeconds }
      : {}),
    ...(canParallelize ? { canParallelize } : {}),
  };
}

// PREP_ITEMS de la v2 mapeados a mano (acción, duración, días de heladera,
// freezable). Más confiable que parsear los textos de storage.
const PREP_MAP: Record<string, SeedPrepItem> = {
  rice: { name: "Arroz basmati cocido", action: "cook", durationMinutes: 20, storageDays: 4, freezable: true },
  chicken: { name: "Pollo cocido desmenuzado", action: "cook", durationMinutes: 25, storageDays: 4, freezable: true },
  eggs: { name: "Huevos duros", action: "cook", durationMinutes: 12, storageDays: 5, freezable: false },
  veggies: { name: "Verduras cortadas", action: "cut", durationMinutes: 15, storageDays: 4, freezable: false },
  asian_sauce: { name: "Salsa base asiática", action: "cook", durationMinutes: 5, storageDays: 14, freezable: false },
  oats: { name: "Overnight oats en frascos", action: "portion", durationMinutes: 5, storageDays: 3, freezable: false },
  guac: { name: "Guacamole casero", action: "portion", durationMinutes: 8, storageDays: 2, freezable: false },
  tzatziki: { name: "Tzatziki / salsa de yogur", action: "portion", durationMinutes: 5, storageDays: 4, freezable: false },
  beef_cubes: { name: "Carne en cubos porcionada", action: "freeze", durationMinutes: 10, storageDays: 1, freezable: true },
  beef_strips: { name: "Carne en tiras porcionada", action: "freeze", durationMinutes: 10, storageDays: 1, freezable: true },
  wok_mix: { name: "Mix de verduras para wok", action: "freeze", durationMinutes: 15, storageDays: 1, freezable: true },
  pasta_mix: { name: "Mix de verduras para pasta", action: "freeze", durationMinutes: 10, storageDays: 1, freezable: true },
  rice_extra: { name: "Porciones extra de arroz", action: "freeze", durationMinutes: 5, storageDays: 1, freezable: true },
  sofrito: { name: "Cebolla sofrita (cubeteras)", action: "cook", durationMinutes: 25, storageDays: 5, freezable: true },
  ground_beef: { name: "Carne picada porcionada", action: "freeze", durationMinutes: 5, storageDays: 1, freezable: true },
};

// kcal recalculadas siempre desde macros (4/4/9); se loggea si la declarada
// difiere >5% (CLAUDE.md, amendment 2).
function computeMacros(
  slug: string,
  m: { prot: number; carbs: number; fat: number; cal: number },
) {
  const computed = Math.round((m.prot * 4 + m.carbs * 4 + m.fat * 9) / 10) * 10;
  const deviation = Math.abs(computed - m.cal) / m.cal;
  if (deviation > 0.05) {
    console.warn(
      `⚠ ${slug}: kcal declaradas ${m.cal} vs calculadas ${computed} (${(deviation * 100).toFixed(1)}%)`,
    );
  }
  return { protein: m.prot, carbs: m.carbs, fats: m.fat, calories: computed };
}

function convertDinner(d: LegacyDinner): SeedRecipe {
  const slug = slugify(d.name);
  const totalMinutes = parseInt(d.time, 10);
  const prepTimeMinutes = Math.min(5, totalMinutes);
  return {
    slug,
    name: d.name,
    description: d.desc ?? `Técnica: ${d.skill}.`,
    category: mapCategory(d),
    difficulty: Math.min(3, Math.max(1, d.diff)) as SeedRecipe["difficulty"],
    servingsDefault: d.sv,
    prepTimeMinutes,
    cookTimeMinutes: totalMinutes - prepTimeMinutes,
    macrosPerServing: computeMacros(slug, d.macros),
    freezable: FREEZABLE_NAMES.has(d.name),
    tags: [
      CUISINE_TAG[d.cat] ?? "clásico",
      ...(totalMinutes <= 12 ? ["rápido"] : []),
      ...(d.macros.prot >= 45 ? ["alto en proteína"] : []),
    ],
    mealSlots: ["lunch", "dinner"] satisfies MealSlot[],
    variationSlugs: [],
    ingredients: d.allIngredients.map(mapIngredient),
    steps: d.steps.map(mapStep),
    prepDependencies: d.prep.map((id) => {
      const prep = PREP_MAP[id];
      if (!prep) throw new Error(`Prep desconocido: ${id} (${d.name})`);
      return prep;
    }),
  };
}

function convertSnack(s: LegacySnack): SeedRecipe {
  const slug = slugify(s.name);
  const isMorning = s.when.includes("AM");
  const slots: MealSlot[] = [
    ...(isMorning ? (["breakfast"] as const) : []),
    ...(s.when.includes("PM") || /gym/i.test(s.when) ? (["snack"] as const) : []),
  ];
  return {
    slug,
    name: s.name,
    description: s.desc,
    category: isMorning && !s.when.includes("PM") ? "breakfast" : "snack",
    difficulty: 1,
    servingsDefault: 1,
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    macrosPerServing: computeMacros(slug, s.macros),
    freezable: false,
    tags: ["rápido", ...(/gym/i.test(s.when) ? ["entrenamiento"] : [])],
    mealSlots: slots.length > 0 ? slots : ["snack"],
    variationSlugs: [],
    ingredients: s.allIngredients.map(mapIngredient),
    steps: [{ text: `Prepará: ${s.desc}` }],
    prepDependencies: [],
  };
}

const converted: SeedRecipe[] = [
  ...(DINNERS as LegacyDinner[]).map(convertDinner),
  ...(SNACKS as LegacySnack[])
    .filter((s) => !SKIP_IDS.has(s.id))
    .map(convertSnack),
];

const header = `import type { SeedRecipe } from "@/types";

// ⚠ ARCHIVO GENERADO por scripts/import-legacy.ts a partir de la data v2.
// Es editable: las correcciones manuales sobreviven mientras no se re-genere.
// Estimaciones a revisar: timers de pasos, mealSlots, freezable, prep deps.

export const LEGACY_RECIPES: SeedRecipe[] = `;

writeFileSync(
  "./src/data/seed/legacy-recipes.ts",
  `${header}${JSON.stringify(converted, null, 2)};\n`,
  "utf8",
);

console.log(`✓ ${converted.length} recetas convertidas → src/data/seed/legacy-recipes.ts`);
