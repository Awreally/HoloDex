# HoloDex

A Pokémon TCG pack-opening and collection app. Open digital packs, build up a
collection, and track how close you are to completing each set. Card and set data
comes from the community-run [TCGdex API](https://tcgdex.dev/).

Built as a full-stack learning project — the goal is a real, deployed app with
authentication, a relational database, and a genuine game loop, not another tutorial clone.

## Status

The core loop works end-to-end: register or log in, open a pack and get a
server-side weighted rarity roll, and browse the cards you've collected. Still
missing: trading, dex-completion tracking, and deployment. See the
[roadmap](#roadmap) for what's built and what's next.

## Tech stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, TypeScript
- **Auth:** JWT sessions in an httpOnly cookie
- **Database:** PostgreSQL (hosted on [Neon](https://neon.com/))
- **ORM:** Prisma 7, using the `@prisma/adapter-pg` driver adapter
- **Card data:** [TCGdex API](https://tcgdex.dev/)
- **Structure:** monorepo — `packages/backend` and `packages/frontend`

## How it works

A few deliberate architecture choices:

- **The frontend only talks to the backend.** The backend owns the database and
  is the only thing that calls the TCGdex API — the frontend never touches either directly.
- **External data is cached in our own database.** Sets are seeded up front; card
  data is currently seeded per-set with a manual script (`seed-cards.ts`) rather
  than fetched on demand — on-open lazy caching is still on the roadmap.
- **Pack opening is server-authoritative** — the server runs the rarity roll and
  decides what you pull, so the result can't be tampered with from the client.
- **Card images load directly from TCGdex's CDN.** The database stores image URLs
  (pointers), not image files.

## Project structure

```
HoloDex/
└─ packages/
   ├─ backend/
   │  ├─ prisma/
   │  │  ├─ migrations/        # database version history
   │  │  └─ schema.prisma      # the data model
   │  ├─ prisma.config.ts
   │  └─ src/
   │     ├─ features/          # feature-based modules
   │     │  ├─ auth/           # register, login, JWT sessions
   │     │  ├─ sets/           # set listing
   │     │  ├─ packs/          # pack opening + rarity roll
   │     │  └─ collection/     # a user's owned cards
   │     ├─ middleware/        # shared middleware (auth, error handling)
   │     ├─ lib/               # shared helpers (prisma client)
   │     ├─ scripts/           # manual scripts (seeding sets/cards)
   │     └─ index.ts           # app entry point
   └─ frontend/
      └─ src/
         ├─ features/          # feature-based modules (auth, packs, collection)
         ├─ pages/             # top-level routed pages (dashboard, sets, trade)
         ├─ components/layout/ # shell UI (top nav, side nav, footer, root layout)
         ├─ routes/            # react-router route table
         └─ lib/               # API client, image URL helpers
```

## Getting started

### Prerequisites

- Node.js 18+
- A free [Neon](https://neon.com/) PostgreSQL database

### 1. Install

```bash
git clone <your-repo-url>
cd HoloDex
npm install
```

### 2. Configure environment

Copy `.env.example` to `packages/backend/.env` and fill in your values:

```
DATABASE_URL="postgresql://USER:PASSWORD@YOUR-HOST-pooler.REGION.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require"
JWT_SECRET="any long random string"
```

Use Neon's **pooled** connection string (the hostname contains `-pooler`), and
`sslmode=verify-full` for a properly verified TLS connection. `JWT_SECRET` signs
login sessions — the server won't start without it. This file is gitignored —
never commit it.

Optional variables (defaults shown):

```
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_EXPIRES_IN=7d
```

### 3. Set up the database

```bash
cd packages/backend
npx prisma generate       # generate the typed Prisma client
npx prisma migrate dev    # create the tables in your Neon database
```

### 4. Seed the sets

```bash
npx tsx src/scripts/seed-sets.ts
```

This fetches every Pokémon set (~218) from TCGdex and stores them. Safe to re-run —
it upserts, so it won't create duplicates. Run it again whenever new sets release.

### 5. Seed cards for at least one set

Sets alone aren't enough to open a pack or build a collection — you need card
rows too. The script currently seeds a fixed list of sets:

```bash
npx tsx src/scripts/seed-cards.ts
```

This seeds `base1`, `base2`, and `sv03.5`. Edit the `SET_IDS` array in
`src/scripts/seed-cards.ts` to seed different or additional sets.

You can browse the seeded data with:

```bash
npx prisma studio
```

### 6. Run the app

From the repo root, this starts the backend and frontend together:

```bash
npm run dev
```

Backend runs on `http://localhost:3000`, frontend on `http://localhost:5173`.

## Roadmap

- [x] Database schema (users, sets, cards, collection)
- [x] Seed sets from TCGdex
- [x] Authentication (JWT) + persistent user collections
- [x] `GET /sets` endpoint + Packs browsing page
- [x] Pack opening — server-side weighted rarity roll
- [ ] Lazy card caching (fetch a set's cards on first open, instead of the manual seed script)
- [ ] Dex completion tracking (owned / total per set)
- [ ] Filter the collection view by set
- [ ] Trading between users (atomic swaps)
- [ ] Docker, CI/CD, and cloud deployment

## Acknowledgements

Card and set data provided by the [TCGdex API](https://tcgdex.dev/). This project
is not produced, endorsed, supported, or affiliated with Nintendo or The Pokémon Company.
