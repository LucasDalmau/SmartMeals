CREATE TYPE "public"."activity_level" AS ENUM('sedentary', 'light', 'moderate', 'active', 'very-active');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TYPE "public"."goal" AS ENUM('lose-fat', 'maintain', 'build-muscle');--> statement-breakpoint
CREATE TYPE "public"."ingredient_category" AS ENUM('protein', 'produce', 'pantry', 'dairy', 'frozen', 'other');--> statement-breakpoint
CREATE TYPE "public"."meal_slot" AS ENUM('breakfast', 'lunch', 'snack', 'dinner');--> statement-breakpoint
CREATE TYPE "public"."pantry_status" AS ENUM('enough', 'low', 'out');--> statement-breakpoint
CREATE TYPE "public"."prep_action" AS ENUM('cook', 'cut', 'portion', 'freeze', 'marinate');--> statement-breakpoint
CREATE TYPE "public"."recipe_category" AS ENUM('poultry', 'beef', 'pasta', 'vegetarian', 'for-two', 'breakfast', 'snack');--> statement-breakpoint
CREATE TYPE "public"."unit" AS ENUM('g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'unit', 'cup', 'pinch', 'clove', 'slice');--> statement-breakpoint
CREATE TABLE "favorites" (
	"user_id" text NOT NULL,
	"recipe_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "favorites_user_id_recipe_id_pk" PRIMARY KEY("user_id","recipe_id")
);
--> statement-breakpoint
CREATE TABLE "ingredients" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" "ingredient_category" NOT NULL,
	CONSTRAINT "ingredients_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "macro_goals" (
	"user_id" text PRIMARY KEY NOT NULL,
	"age" smallint NOT NULL,
	"height_cm" real NOT NULL,
	"weight_kg" real NOT NULL,
	"gender" "gender" NOT NULL,
	"activity_level" "activity_level" NOT NULL,
	"goal" "goal" NOT NULL,
	"tdee" real NOT NULL,
	"weekly_protein" real NOT NULL,
	"weekly_carbs" real NOT NULL,
	"weekly_fats" real NOT NULL,
	"weekly_calories" real NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pantry_items" (
	"user_id" text NOT NULL,
	"ingredient_id" text NOT NULL,
	"status" "pantry_status" NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pantry_items_user_id_ingredient_id_pk" PRIMARY KEY("user_id","ingredient_id")
);
--> statement-breakpoint
CREATE TABLE "plan_entries" (
	"id" text PRIMARY KEY NOT NULL,
	"plan_id" text NOT NULL,
	"day" smallint NOT NULL,
	"slot" "meal_slot" NOT NULL,
	"recipe_id" text NOT NULL,
	"servings" real DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pool_entries" (
	"id" text PRIMARY KEY NOT NULL,
	"plan_id" text NOT NULL,
	"recipe_id" text NOT NULL,
	"servings" real DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prep_items" (
	"id" text PRIMARY KEY NOT NULL,
	"recipe_id" text NOT NULL,
	"name" text NOT NULL,
	"action" "prep_action" NOT NULL,
	"duration_minutes" smallint NOT NULL,
	"storage_days" smallint NOT NULL,
	"freezable" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipe_ingredients" (
	"id" text PRIMARY KEY NOT NULL,
	"recipe_id" text NOT NULL,
	"ingredient_id" text NOT NULL,
	"amount" real NOT NULL,
	"unit" "unit" NOT NULL,
	"sort_order" smallint DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipe_notes" (
	"user_id" text NOT NULL,
	"recipe_id" text NOT NULL,
	"text" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "recipe_notes_user_id_recipe_id_pk" PRIMARY KEY("user_id","recipe_id")
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"category" "recipe_category" NOT NULL,
	"difficulty" smallint DEFAULT 1 NOT NULL,
	"servings_default" smallint DEFAULT 1 NOT NULL,
	"prep_time_minutes" smallint NOT NULL,
	"cook_time_minutes" smallint NOT NULL,
	"protein" real NOT NULL,
	"carbs" real NOT NULL,
	"fats" real NOT NULL,
	"calories" real NOT NULL,
	"freezable" boolean DEFAULT false NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"meal_slots" "meal_slot"[] DEFAULT '{}' NOT NULL,
	"variation_ids" text[] DEFAULT '{}' NOT NULL,
	"owner_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "recipes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "steps" (
	"id" text PRIMARY KEY NOT NULL,
	"recipe_id" text NOT NULL,
	"order" smallint NOT NULL,
	"text" text NOT NULL,
	"timer_seconds" integer,
	"can_parallelize" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "week_plans" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"iso_week" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "macro_goals" ADD CONSTRAINT "macro_goals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pantry_items" ADD CONSTRAINT "pantry_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pantry_items" ADD CONSTRAINT "pantry_items_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plan_entries" ADD CONSTRAINT "plan_entries_plan_id_week_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."week_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plan_entries" ADD CONSTRAINT "plan_entries_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pool_entries" ADD CONSTRAINT "pool_entries_plan_id_week_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."week_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pool_entries" ADD CONSTRAINT "pool_entries_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prep_items" ADD CONSTRAINT "prep_items_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_notes" ADD CONSTRAINT "recipe_notes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_notes" ADD CONSTRAINT "recipe_notes_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "steps" ADD CONSTRAINT "steps_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "week_plans" ADD CONSTRAINT "week_plans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "plan_entry_unique" ON "plan_entries" USING btree ("plan_id","day","slot");--> statement-breakpoint
CREATE UNIQUE INDEX "pool_entry_unique" ON "pool_entries" USING btree ("plan_id","recipe_id");--> statement-breakpoint
CREATE UNIQUE INDEX "recipe_ingredient_unique" ON "recipe_ingredients" USING btree ("recipe_id","ingredient_id");--> statement-breakpoint
CREATE UNIQUE INDEX "step_order_unique" ON "steps" USING btree ("recipe_id","order");--> statement-breakpoint
CREATE UNIQUE INDEX "week_plan_unique" ON "week_plans" USING btree ("user_id","iso_week");