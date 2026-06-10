// Migra y siembra la base. Sin DATABASE_URL usa PGlite local (./.pglite).
// Uso: npm run db:seed

import * as schema from "../src/lib/db/schema";
import { runSeed } from "../src/lib/db/seed";

const MIGRATIONS = { migrationsFolder: "./drizzle" };

async function main() {
  if (process.env.DATABASE_URL) {
    const { drizzle } = await import("drizzle-orm/node-postgres");
    const { migrate } = await import("drizzle-orm/node-postgres/migrator");
    const db = drizzle(process.env.DATABASE_URL, { schema });
    await migrate(db, MIGRATIONS);
    await runSeed(db);
    await db.$client.end();
    console.log("✓ Migración y seed sobre DATABASE_URL");
  } else {
    const { drizzle } = await import("drizzle-orm/pglite");
    const { migrate } = await import("drizzle-orm/pglite/migrator");
    const db = drizzle("./.pglite", { schema });
    await migrate(db, MIGRATIONS);
    await runSeed(db);
    await db.$client.close();
    console.log("✓ Migración y seed sobre PGlite local (./.pglite)");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
