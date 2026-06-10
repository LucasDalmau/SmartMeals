import { getRequestConfig } from "next-intl/server";

// v3 lanza solo en español; next-intl queda cableado desde el día uno para que
// agregar inglés sea solo sumar un locale (ver CLAUDE.md, amendment 1).
export const LOCALE = "es" as const;

export default getRequestConfig(async () => ({
  locale: LOCALE,
  messages: (await import(`../../messages/${LOCALE}.json`)).default,
}));
