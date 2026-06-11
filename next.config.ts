import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Drivers de DB con binarios/WASM: no bundlear.
  serverExternalPackages: ["@electric-sql/pglite", "pg"],
  // El modo demo (PGlite en memoria) corre las migraciones en runtime;
  // hay que incluir la carpeta drizzle en el bundle de las lambdas.
  outputFileTracingIncludes: {
    "/**": ["./drizzle/**"],
  },
};

export default withNextIntl(nextConfig);
