# Rodiat & Mubarak — Nikkah Invitation

An elegant, single-page Nikkah (wedding) invitation site. Guests can read the
couple's story, see event details, leave duas/wishes on a live wall, view gift
account details, and — on the wedding day — join the ceremony online.

Built with the Next.js App Router and backed by a Neon Postgres database for the
interactive pieces (the Wishes wall and editable settings).

## Features

- **Hero & invitation** — bismillah, couple names, date, and venue.
- **Qur'anic verse & love story** — Surah Ar-Rum 30:21 and a short timeline.
- **Wishes & Duas wall** — guests post messages and "heart" others' wishes.
  Everything is persisted in Postgres.
- **Countdown** — live countdown to the ceremony, plus a **"Join us online here"**
  link that appears **only on the wedding day** (URL is stored in the database).
- **Gifts** — Nigerian bank details (stored in the database) and Canadian Interac
  details, each with a copy-to-clipboard button.
- **Footer** — closing dua.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Server Actions)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/) + [`@neondatabase/serverless`](https://neon.tech/docs/serverless/serverless-driver) (HTTP driver)
- [Neon](https://neon.tech/) Postgres
- [pnpm](https://pnpm.io/) (via Corepack)

## Prerequisites

- **Node.js 20+**
- **pnpm** — this repo uses pnpm (`pnpm-lock.yaml`). If you don't have it,
  enable it via Corepack:

  ```bash
  corepack enable
  ```

- A **Neon Postgres** database (free tier is plenty).

## Getting started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure environment variables**

   Copy the example file and paste your Neon connection string:

   ```bash
   cp .env.example .env.local
   ```

   ```dotenv
   # .env.local
   DATABASE_URL="postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/dbname?sslmode=require"
   ```

   `.env.local` is git-ignored, so your credentials are never committed.

3. **Set up the database**

   Creates the `wishes` and `settings` tables (idempotent) and seeds initial
   data if the tables are empty:

   ```bash
   pnpm db:setup
   ```

4. **Run the dev server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Script            | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `pnpm dev`        | Start the Next.js dev server.                                      |
| `pnpm build`      | Production build.                                                  |
| `pnpm start`      | Start the production server (after `build`).                       |
| `pnpm lint`       | Run ESLint.                                                        |
| `pnpm db:generate`| Generate a Drizzle SQL migration from the schema.                  |
| `pnpm db:setup`   | Create the tables (if missing) and seed initial data. Idempotent.  |

## Project structure

```
app/
  layout.tsx           # Root layout, fonts, metadata
  page.tsx             # Composes all sections; fetches DB-driven data
  actions/wishes.ts    # Server Actions: postWish, likeWish
components/nikkah/     # UI sections (hero, verse, journey, countdown, wishes, gifts, ...)
lib/
  wedding.ts           # Central config: names, date, venue, events, fallback gift details
  db/schema.ts         # Drizzle schema (wishes, settings)
  db/index.ts          # Lazily-initialised Neon + Drizzle client
  wishes.ts            # Data access: listWishes, createWish, heartWish
  settings.ts          # Data access: getLivestreamUrl, getNigeriaAccount
scripts/db-setup.mjs   # Idempotent DB bootstrap + seed
drizzle/               # Generated SQL migrations
```

## Configuration

Static content (names, date, venue, events, and the **fallback** gift details)
lives in [`lib/wedding.ts`](lib/wedding.ts). Edit it and the site updates.

Some values are **database-driven** so they can be changed without a redeploy
(see below).

## Database

Two tables live in your Neon database:

- **`wishes`** — guest messages (`id`, `name`, `message`, `hearts`, `created_at`).
- **`settings`** — a simple key/value store for editable content.

### Moderating wishes

There's no admin UI by design — moderate directly in the Neon SQL editor:

```sql
DELETE FROM wishes WHERE id = 42;
```

### Editable settings

| Key                      | Purpose                                                       |
| ------------------------ | ------------------------------------------------------------- |
| `livestream_url`         | Livestream link. Shown as "Join us online here" **only on the wedding day**. Leave empty to hide. |
| `nigeria_bank_name`      | Nigerian bank name shown in the Gifts section.                |
| `nigeria_account_name`   | Nigerian account holder name.                                 |
| `nigeria_account_number` | Nigerian account number.                                      |

Update them directly in Neon, for example:

```sql
UPDATE settings SET value = 'https://youtube.com/live/...' WHERE key = 'livestream_url';
UPDATE settings SET value = '1234567890'                   WHERE key = 'nigeria_account_number';
```

If a Nigerian value is missing or empty, the site falls back to the value in
`lib/wedding.ts`, so the Gifts card never renders blank.

### Migrations

The schema is defined in `lib/db/schema.ts`. `pnpm db:setup` applies it
idempotently (safe on fresh or existing databases). To generate a versioned SQL
migration after changing the schema:

```bash
pnpm db:generate
```

> Note: `drizzle-kit migrate` is intentionally not used here because it requires
> a WebSocket connection, which doesn't fit Neon's HTTP driver. The idempotent
> `pnpm db:setup` script is the supported way to apply schema changes.

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new). Next.js and
   pnpm are auto-detected — no custom build settings needed.
3. Add the `DATABASE_URL` environment variable (your Neon connection string)
   under **Project Settings → Environment Variables** for **Production** (and
   **Preview** if you want PR previews to hit the database).
4. Deploy. Every push to `main` redeploys automatically.

The tables already exist in Neon, so there's no build-time migration step — just
make sure Vercel's `DATABASE_URL` points at the same database.
