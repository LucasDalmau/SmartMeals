"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";

export async function toggleFavorite(recipeId: string) {
  const user = await getCurrentUser();
  const db = await getDb();

  const existing = await db.query.favorites.findFirst({
    where: and(
      eq(schema.favorites.userId, user.id),
      eq(schema.favorites.recipeId, recipeId),
    ),
  });

  if (existing) {
    await db
      .delete(schema.favorites)
      .where(
        and(
          eq(schema.favorites.userId, user.id),
          eq(schema.favorites.recipeId, recipeId),
        ),
      );
  } else {
    await db
      .insert(schema.favorites)
      .values({ userId: user.id, recipeId })
      .onConflictDoNothing();
  }

  revalidatePath("/recipes");
}

export async function saveNote(recipeId: string, text: string) {
  const user = await getCurrentUser();
  const db = await getDb();
  const trimmed = text.trim();

  if (trimmed === "") {
    await db
      .delete(schema.recipeNotes)
      .where(
        and(
          eq(schema.recipeNotes.userId, user.id),
          eq(schema.recipeNotes.recipeId, recipeId),
        ),
      );
  } else {
    await db
      .insert(schema.recipeNotes)
      .values({ userId: user.id, recipeId, text: trimmed })
      .onConflictDoUpdate({
        target: [schema.recipeNotes.userId, schema.recipeNotes.recipeId],
        set: { text: trimmed, updatedAt: new Date() },
      });
  }

  revalidatePath("/recipes");
}
