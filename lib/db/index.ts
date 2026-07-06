import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

type DrizzleClient = ReturnType<typeof createClient>

function createClient() {
  const databaseUrl = process.env.NEW_DATABASE_URL

  if (!databaseUrl) {
    throw new Error(
      "NEW_DATABASE_URL is not set. Add your Neon connection string to .env.local (and the Vercel project settings).",
    )
  }

  return drizzle(neon(databaseUrl), { schema })
}

// Lazily instantiate so that merely importing this module (e.g. during
// `next build`) does not require NEW_DATABASE_URL; the connection is only created
// on first query at request time.
let client: DrizzleClient | undefined

export const db = new Proxy({} as DrizzleClient, {
  get(_target, prop, receiver) {
    if (!client) {
      client = createClient()
    }
    return Reflect.get(client, prop, receiver)
  },
})
