import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const wishes = pgTable("wishes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  hearts: integer("hearts").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Wish = typeof wishes.$inferSelect
export type NewWish = typeof wishes.$inferInsert

// Simple key/value store for editable site settings (e.g. the livestream URL).
// Manage values directly in the database.
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
})

export type Setting = typeof settings.$inferSelect
