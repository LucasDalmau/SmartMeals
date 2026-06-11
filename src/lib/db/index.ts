import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import * as schema from "./schema";

// Tres modos, en orden de prioridad:
// 1. DATABASE_URL (Vercel Postgres / Neon) → node-postgres. Producción real.
// 2. Producción SIN DATABASE_URL → modo demo: PGlite en memoria, migrado y
//    sembrado en el cold start. Mantiene el deploy verde hasta que exista el
//    Postgres; las escrituras NO persisten entre instancias.
// 3. Desarrollo local → PGlite persistente en ./.pglite (npm run db:seed).
export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

const globalForDb = globalThis as unknown as { dbPromise?: Promise<Db> };

async function createDb(): Promise<Db> {
  if (process.env.DATABASE_URL) {
    const { drizzle } = await import("drizzle-orm/node-postgres");
    return drizzle(process.env.DATABASE_URL, { schema });
  }

  const { drizzle } = await import("drizzle-orm/pglite");

  if (process.env.NODE_ENV === "production") {
    const { PGlite } = await import("@electric-sql/pglite");
    const { migrate } = await import("drizzle-orm/pglite/migrator");
    const { runSeed } = await import("./seed");
    const db = drizzle(new PGlite(), { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });
    await runSeed(db);
    return db;
  }

  return drizzle("./.pglite", { schema });
}

export function getDb(): Promise<Db> {
  // Promise cacheada: evita que dos requests concurrentes del mismo cold
  // start migren/siembren dos veces.
  globalForDb.dbPromise ??= createDb();
  return globalForDb.dbPromise;
}

export { schema };
