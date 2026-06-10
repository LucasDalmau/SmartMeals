import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import * as schema from "./schema";

// Con DATABASE_URL (Vercel Postgres / Neon) usa node-postgres; sin ella
// (desarrollo local y tests) usa PGlite, un Postgres embebido que persiste
// en ./.pglite — cero instalación, mismo SQL que producción.
export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

const globalForDb = globalThis as unknown as { db?: Db };

export async function getDb(): Promise<Db> {
  if (globalForDb.db) return globalForDb.db;

  if (process.env.DATABASE_URL) {
    const { drizzle } = await import("drizzle-orm/node-postgres");
    globalForDb.db = drizzle(process.env.DATABASE_URL, { schema });
  } else {
    const { drizzle } = await import("drizzle-orm/pglite");
    globalForDb.db = drizzle("./.pglite", { schema });
  }
  return globalForDb.db;
}

export { schema };
