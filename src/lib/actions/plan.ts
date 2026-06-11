"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getDb, schema, type Db } from "@/lib/db";
import { isValidIsoWeek, type IsoWeek } from "@/lib/week";
import { MEAL_SLOTS, type MealSlot } from "@/types";

// Toda action valida pertenencia: el plan siempre se busca/crea por
// (userId, isoWeek), nunca por id suelto del cliente.

async function getOrCreatePlan(db: Db, userId: string, isoWeek: IsoWeek) {
  if (!isValidIsoWeek(isoWeek)) throw new Error(`Semana inválida: ${isoWeek}`);
  const [plan] = await db
    .insert(schema.weekPlans)
    .values({ userId, isoWeek })
    .onConflictDoNothing()
    .returning();
  if (plan) return plan;
  const existing = await db.query.weekPlans.findFirst({
    where: and(
      eq(schema.weekPlans.userId, userId),
      eq(schema.weekPlans.isoWeek, isoWeek),
    ),
  });
  if (!existing) throw new Error("No se pudo crear el plan");
  return existing;
}

function assertSlot(slot: string): asserts slot is MealSlot {
  if (!MEAL_SLOTS.includes(slot as MealSlot))
    throw new Error(`Slot inválido: ${slot}`);
}

function assertDay(day: number) {
  if (!Number.isInteger(day) || day < 0 || day > 6)
    throw new Error(`Día inválido: ${day}`);
}

export async function assignSlot(args: {
  isoWeek: IsoWeek;
  day: number;
  slot: string;
  recipeId: string;
  servings?: number;
  fromPool?: boolean;
}) {
  const { isoWeek, day, slot, recipeId, fromPool } = args;
  assertSlot(slot);
  assertDay(day);
  const user = await getCurrentUser();
  const db = await getDb();
  const plan = await getOrCreatePlan(db, user.id, isoWeek);

  const recipe = await db.query.recipes.findFirst({
    where: eq(schema.recipes.id, recipeId),
    columns: { servingsDefault: true },
  });
  if (!recipe) throw new Error("Receta inexistente");
  const servings = args.servings ?? recipe.servingsDefault;
  if (servings <= 0 || servings > 12) throw new Error("Porciones inválidas");

  await db
    .insert(schema.planEntries)
    .values({ planId: plan.id, day, slot, recipeId, servings })
    .onConflictDoUpdate({
      target: [schema.planEntries.planId, schema.planEntries.day, schema.planEntries.slot],
      set: { recipeId, servings },
    });

  if (fromPool) {
    await db
      .delete(schema.poolEntries)
      .where(
        and(
          eq(schema.poolEntries.planId, plan.id),
          eq(schema.poolEntries.recipeId, recipeId),
        ),
      );
  }

  revalidatePath("/plan", "layout");
  redirect(`/plan?week=${isoWeek}`);
}

export async function clearSlot(args: {
  isoWeek: IsoWeek;
  day: number;
  slot: string;
}) {
  const { isoWeek, day, slot } = args;
  assertSlot(slot);
  assertDay(day);
  const user = await getCurrentUser();
  const db = await getDb();
  const plan = await getOrCreatePlan(db, user.id, isoWeek);

  await db
    .delete(schema.planEntries)
    .where(
      and(
        eq(schema.planEntries.planId, plan.id),
        eq(schema.planEntries.day, day),
        eq(schema.planEntries.slot, slot),
      ),
    );

  revalidatePath("/plan", "layout");
  redirect(`/plan?week=${isoWeek}`);
}

export async function updateEntryServings(args: {
  isoWeek: IsoWeek;
  day: number;
  slot: string;
  servings: number;
}) {
  const { isoWeek, day, slot, servings } = args;
  assertSlot(slot);
  assertDay(day);
  if (servings <= 0 || servings > 12) throw new Error("Porciones inválidas");
  const user = await getCurrentUser();
  const db = await getDb();
  const plan = await getOrCreatePlan(db, user.id, isoWeek);

  await db
    .update(schema.planEntries)
    .set({ servings })
    .where(
      and(
        eq(schema.planEntries.planId, plan.id),
        eq(schema.planEntries.day, day),
        eq(schema.planEntries.slot, slot),
      ),
    );

  revalidatePath("/plan", "layout");
}

export async function togglePool(args: { isoWeek: IsoWeek; recipeId: string }) {
  const { isoWeek, recipeId } = args;
  const user = await getCurrentUser();
  const db = await getDb();
  const plan = await getOrCreatePlan(db, user.id, isoWeek);

  const existing = await db.query.poolEntries.findFirst({
    where: and(
      eq(schema.poolEntries.planId, plan.id),
      eq(schema.poolEntries.recipeId, recipeId),
    ),
  });

  if (existing) {
    await db
      .delete(schema.poolEntries)
      .where(eq(schema.poolEntries.id, existing.id));
  } else {
    const recipe = await db.query.recipes.findFirst({
      where: eq(schema.recipes.id, recipeId),
      columns: { servingsDefault: true },
    });
    if (!recipe) throw new Error("Receta inexistente");
    await db
      .insert(schema.poolEntries)
      .values({ planId: plan.id, recipeId, servings: recipe.servingsDefault })
      .onConflictDoNothing();
  }

  revalidatePath("/plan", "layout");
  revalidatePath("/recipes", "layout");
}
