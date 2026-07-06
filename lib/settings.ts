import { eq, inArray } from "drizzle-orm"
import { db } from "./db"
import { settings } from "./db/schema"
import { wedding } from "./wedding"

export const LIVESTREAM_URL_KEY = "livestream_url"

// Returns the livestream URL stored in the `settings` table, or null when it
// has not been set yet. Edit it directly in the database:
//   UPDATE settings SET value = 'https://...' WHERE key = 'livestream_url';
export async function getLivestreamUrl(): Promise<string | null> {
  const [row] = await db
    .select()
    .from(settings)
    .where(eq(settings.key, LIVESTREAM_URL_KEY))

  const value = row?.value?.trim()
  return value ? value : null
}

// Settings keys for the Nigerian gift/bank account details.
export const NIGERIA_KEYS = {
  bankName: "nigeria_bank_name",
  accountName: "nigeria_account_name",
  accountNumber: "nigeria_account_number",
} as const

export type NigeriaAccount = {
  bankName: string
  accountName: string
  accountNumber: string
}

// Returns the Nigerian account details from the `settings` table. Each field
// falls back to the value in lib/wedding.ts if its row is missing or empty, so
// the card never renders blank. Edit values directly in the database, e.g.:
//   UPDATE settings SET value = '1234567890' WHERE key = 'nigeria_account_number';
export async function getNigeriaAccount(): Promise<NigeriaAccount> {
  const rows = await db
    .select()
    .from(settings)
    .where(inArray(settings.key, Object.values(NIGERIA_KEYS)))

  const values = new Map(rows.map((row) => [row.key, row.value?.trim() ?? ""]))
  const fallback = wedding.gifts.nigeria

  return {
    bankName: values.get(NIGERIA_KEYS.bankName) || fallback.bankName,
    accountName: values.get(NIGERIA_KEYS.accountName) || fallback.accountName,
    accountNumber:
      values.get(NIGERIA_KEYS.accountNumber) || fallback.accountNumber,
  }
}
