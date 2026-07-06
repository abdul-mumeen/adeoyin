import { desc, eq, sql } from "drizzle-orm"
import { db } from "./db"
import { wishes, type Wish } from "./db/schema"

export const NAME_MAX_LENGTH = 80
export const MESSAGE_MAX_LENGTH = 500

export type WishInput = {
  name: string
  message: string
}

export async function listWishes(): Promise<Wish[]> {
  return db.select().from(wishes).orderBy(desc(wishes.createdAt))
}

export async function createWish(input: WishInput): Promise<Wish> {
  const name = input.name.trim().slice(0, NAME_MAX_LENGTH)
  const message = input.message.trim().slice(0, MESSAGE_MAX_LENGTH)

  if (!name || !message) {
    throw new Error("Both a name and a message are required.")
  }

  const [created] = await db
    .insert(wishes)
    .values({ name, message })
    .returning()

  return created
}

export async function heartWish(id: number): Promise<void> {
  if (!Number.isInteger(id)) {
    throw new Error("Invalid wish id.")
  }

  await db
    .update(wishes)
    .set({ hearts: sql`${wishes.hearts} + 1` })
    .where(eq(wishes.id, id))
}
