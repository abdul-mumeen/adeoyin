import { defineConfig } from "drizzle-kit"

// Load NEW_DATABASE_URL from .env.local (Next.js convention) for drizzle-kit CLI.
// process.loadEnvFile is available in Node 20.12+ / 24.
try {
  process.loadEnvFile(".env.local")
} catch {
  // .env.local is optional (e.g. the var may already be in the environment).
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEW_DATABASE_URL!,
  },
})
