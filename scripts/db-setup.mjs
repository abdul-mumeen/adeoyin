// Idempotently ensures the `wishes` table exists, then seeds the original
// three wishes if the table is empty. Safe to run against a fresh or existing
// Neon database (it only touches the `wishes` table).
// Run with: node --env-file=.env.local scripts/db-setup.mjs
import { neon } from "@neondatabase/serverless"

const url = process.env.DATABASE_URL
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local.")
  process.exit(1)
}

const sql = neon(url)

await sql`
  CREATE TABLE IF NOT EXISTS "wishes" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "message" text NOT NULL,
    "hearts" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
  )
`
console.log("wishes table ready.")

await sql`
  CREATE TABLE IF NOT EXISTS "settings" (
    "key" text PRIMARY KEY NOT NULL,
    "value" text DEFAULT '' NOT NULL
  )
`
await sql`
  INSERT INTO settings (key, value) VALUES ('livestream_url', '')
  ON CONFLICT (key) DO NOTHING
`

// Seed the Nigerian account details (only if not already present, so manual
// edits made in the database are never overwritten on re-run).
const nigeriaSeed = [
  ["nigeria_bank_name", "Access Bank of Nigeria"],
  ["nigeria_account_name", "Olasode Mubarak"],
  ["nigeria_account_number", "0787675039"],
]
for (const [key, value] of nigeriaSeed) {
  await sql`INSERT INTO settings (key, value) VALUES (${key}, ${value}) ON CONFLICT (key) DO NOTHING`
}
console.log("settings table ready (livestream_url + nigeria_* keys present).")

const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM wishes`

if (count === 0) {
  const seed = [
    [
      "Modinat & Family",
      "May Allah bless your union with sabr, love, and countless joyful years. Barakallahu lakuma!",
      24,
    ],
    [
      "AbdulMumeen & Family",
      "So proud of you both. May your home always be filled with light, laughter, and the remembrance of Allah.",
      18,
    ],
    [
      "Mum",
      "Two of the kindest souls, finally together. Wishing you a lifetime of tranquillity. Ameen.",
      31,
    ],
  ]

  for (const [name, message, hearts] of seed) {
    await sql`INSERT INTO wishes (name, message, hearts) VALUES (${name}, ${message}, ${hearts})`
  }
  console.log(`Seeded ${seed.length} wishes.`)
} else {
  console.log(`Skipped seed (${count} wishes already present).`)
}

console.log("Done.")
