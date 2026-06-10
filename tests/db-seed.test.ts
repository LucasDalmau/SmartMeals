import { PGlite } from "@electric-sql/pglite";
import { eq, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { beforeAll, describe, expect, it } from "vitest";
import * as schema from "@/lib/db/schema";
import { runSeed } from "@/lib/db/seed";
import type { Db } from "@/lib/db";

// Roundtrip real: migraciones + seed dos veces (idempotencia) sobre un
// Postgres en memoria (PGlite). Mismo dialecto que producción.

let db: Db;

beforeAll(async () => {
  const client = new PGlite();
  const pgliteDb = drizzle(client, { schema });
  await migrate(pgliteDb, { migrationsFolder: "./drizzle" });
  await runSeed(pgliteDb);
  await runSeed(pgliteDb); // segunda pasada: debe ser idempotente
  db = pgliteDb;
});

describe("migración + seed en PGlite", () => {
  it("siembra las 52 recetas builtin sin duplicar", async () => {
    const rows = await db
      .select()
      .from(schema.recipes)
      .where(isNull(schema.recipes.ownerId));
    expect(rows).toHaveLength(52);
  });

  it("crea el usuario dev", async () => {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, "dev@smartmeals.local"),
    });
    expect(user).toBeDefined();
  });

  it("normaliza el maestro de ingredientes (Papa aparece una sola vez)", async () => {
    const papas = await db
      .select()
      .from(schema.ingredients)
      .where(eq(schema.ingredients.name, "Papa"));
    expect(papas).toHaveLength(1);
  });

  it("resuelve variaciones a ids de recetas existentes", async () => {
    const milanesa = await db.query.recipes.findFirst({
      where: eq(schema.recipes.slug, "milanesa-con-pure"),
    });
    expect(milanesa).toBeDefined();
    expect(milanesa!.variationIds.length).toBeGreaterThan(0);

    const bife = await db.query.recipes.findFirst({
      where: eq(schema.recipes.slug, "bife-a-la-plancha"),
    });
    expect(milanesa!.variationIds).toContain(bife!.id);
  });

  it("regenera filas hijas sin duplicarlas (steps de milanesa = 5)", async () => {
    const milanesa = await db.query.recipes.findFirst({
      where: eq(schema.recipes.slug, "milanesa-con-pure"),
    });
    const stepsRows = await db
      .select()
      .from(schema.steps)
      .where(eq(schema.steps.recipeId, milanesa!.id));
    expect(stepsRows).toHaveLength(5);
  });

  it("el locro guarda prepDependencies con freezable", async () => {
    const locro = await db.query.recipes.findFirst({
      where: eq(schema.recipes.slug, "locro"),
    });
    const preps = await db
      .select()
      .from(schema.prepItems)
      .where(eq(schema.prepItems.recipeId, locro!.id));
    expect(preps.length).toBeGreaterThanOrEqual(2);
    expect(preps.some((p) => p.freezable)).toBe(true);
  });
});
