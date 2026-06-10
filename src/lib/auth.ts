import { eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";

// Auth.js v5 + Google se integra cuando exista el OAuth client (decisión del
// 2026-06-10). Hasta entonces, la app corre con un usuario de desarrollo
// sembrado por el seed. Regla: NINGÚN módulo accede al usuario por otra vía
// que no sea getCurrentUser(); así el cambio a sesiones reales es solo acá.

export const DEV_USER_EMAIL = "dev@smartmeals.local";

export async function getCurrentUser() {
  const db = await getDb();
  const user = await db.query.users.findFirst({
    where: eq(schema.users.email, DEV_USER_EMAIL),
  });
  if (!user) {
    throw new Error(
      "Usuario dev no encontrado. Corré `npm run db:seed` primero.",
    );
  }
  return user;
}
