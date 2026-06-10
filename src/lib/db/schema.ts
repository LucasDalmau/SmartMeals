import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  smallint,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import {
  ACTIVITY_LEVELS,
  GENDERS,
  GOALS,
  INGREDIENT_CATEGORIES,
  MEAL_SLOTS,
  PANTRY_STATUSES,
  PREP_ACTIONS,
  RECIPE_CATEGORIES,
  UNITS,
} from "@/types";

const id = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

export const recipeCategoryEnum = pgEnum("recipe_category", RECIPE_CATEGORIES);
export const unitEnum = pgEnum("unit", UNITS);
export const ingredientCategoryEnum = pgEnum(
  "ingredient_category",
  INGREDIENT_CATEGORIES,
);
export const mealSlotEnum = pgEnum("meal_slot", MEAL_SLOTS);
export const prepActionEnum = pgEnum("prep_action", PREP_ACTIONS);
export const pantryStatusEnum = pgEnum("pantry_status", PANTRY_STATUSES);
export const genderEnum = pgEnum("gender", GENDERS);
export const activityLevelEnum = pgEnum("activity_level", ACTIVITY_LEVELS);
export const goalEnum = pgEnum("goal", GOALS);

// ── Usuarios ────────────────────────────────────────────────────────────────
// Multi-usuario desde el día uno aunque el OAuth llegue después: toda tabla
// de datos personales referencia users.id.

export const users = pgTable("users", {
  id: id(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ── Recetas ─────────────────────────────────────────────────────────────────
// ownerId null = receta builtin (seed); con valor = receta custom del usuario.
// Cantidades de ingredientes: para servingsDefault porciones.
// Macros: siempre por porción.

export const recipes = pgTable("recipes", {
  id: id(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  category: recipeCategoryEnum("category").notNull(),
  difficulty: smallint("difficulty").notNull().default(1),
  servingsDefault: smallint("servings_default").notNull().default(1),
  prepTimeMinutes: smallint("prep_time_minutes").notNull(),
  cookTimeMinutes: smallint("cook_time_minutes").notNull(),
  protein: real("protein").notNull(),
  carbs: real("carbs").notNull(),
  fats: real("fats").notNull(),
  calories: real("calories").notNull(),
  freezable: boolean("freezable").notNull().default(false),
  tags: text("tags").array().notNull().default([]),
  mealSlots: mealSlotEnum("meal_slots").array().notNull().default([]),
  variationIds: text("variation_ids").array().notNull().default([]),
  ownerId: text("owner_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Maestro de ingredientes, normalizado por nombre. Lo comparten recetas,
// despensa y agregación de compras.
export const ingredients = pgTable("ingredients", {
  id: id(),
  name: text("name").notNull().unique(),
  category: ingredientCategoryEnum("category").notNull(),
});

export const recipeIngredients = pgTable(
  "recipe_ingredients",
  {
    id: id(),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    ingredientId: text("ingredient_id")
      .notNull()
      .references(() => ingredients.id),
    amount: real("amount").notNull(),
    unit: unitEnum("unit").notNull(),
    sortOrder: smallint("sort_order").notNull().default(0),
  },
  (t) => [uniqueIndex("recipe_ingredient_unique").on(t.recipeId, t.ingredientId)],
);

export const steps = pgTable(
  "steps",
  {
    id: id(),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    order: smallint("order").notNull(),
    text: text("text").notNull(),
    timerSeconds: integer("timer_seconds"),
    canParallelize: boolean("can_parallelize").notNull().default(false),
  },
  (t) => [uniqueIndex("step_order_unique").on(t.recipeId, t.order)],
);

export const prepItems = pgTable("prep_items", {
  id: id(),
  recipeId: text("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  action: prepActionEnum("action").notNull(),
  durationMinutes: smallint("duration_minutes").notNull(),
  storageDays: smallint("storage_days").notNull(),
  freezable: boolean("freezable").notNull().default(false),
});

// ── Datos por usuario ───────────────────────────────────────────────────────

export const favorites = pgTable(
  "favorites",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.recipeId] })],
);

export const recipeNotes = pgTable(
  "recipe_notes",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.recipeId] })],
);

// Un plan por usuario por semana ISO ("2026-W24"). El pool ("a preparar")
// pertenece al plan de esa semana.
export const weekPlans = pgTable(
  "week_plans",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    isoWeek: text("iso_week").notNull(),
  },
  (t) => [uniqueIndex("week_plan_unique").on(t.userId, t.isoWeek)],
);

export const planEntries = pgTable(
  "plan_entries",
  {
    id: id(),
    planId: text("plan_id")
      .notNull()
      .references(() => weekPlans.id, { onDelete: "cascade" }),
    /** 0 = lunes … 6 = domingo */
    day: smallint("day").notNull(),
    slot: mealSlotEnum("slot").notNull(),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    servings: real("servings").notNull().default(1),
  },
  (t) => [uniqueIndex("plan_entry_unique").on(t.planId, t.day, t.slot)],
);

export const poolEntries = pgTable(
  "pool_entries",
  {
    id: id(),
    planId: text("plan_id")
      .notNull()
      .references(() => weekPlans.id, { onDelete: "cascade" }),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    servings: real("servings").notNull().default(1),
  },
  (t) => [uniqueIndex("pool_entry_unique").on(t.planId, t.recipeId)],
);

export const pantryItems = pgTable(
  "pantry_items",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ingredientId: text("ingredient_id")
      .notNull()
      .references(() => ingredients.id, { onDelete: "cascade" }),
    status: pantryStatusEnum("status").notNull(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.ingredientId] })],
);

export const macroGoals = pgTable("macro_goals", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  age: smallint("age").notNull(),
  heightCm: real("height_cm").notNull(),
  weightKg: real("weight_kg").notNull(),
  gender: genderEnum("gender").notNull(),
  activityLevel: activityLevelEnum("activity_level").notNull(),
  goal: goalEnum("goal").notNull(),
  // Derivados de los campos de arriba; se persisten por performance.
  tdee: real("tdee").notNull(),
  weeklyProtein: real("weekly_protein").notNull(),
  weeklyCarbs: real("weekly_carbs").notNull(),
  weeklyFats: real("weekly_fats").notNull(),
  weeklyCalories: real("weekly_calories").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
