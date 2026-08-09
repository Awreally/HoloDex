# HoloDex

A Pokémon TCG pack-opening and collection app. Open digital packs, build up a
collection, and track how close you are to completing each set. Card and set data
comes from the community-run [TCGdex API](https://tcgdex.dev/).

Built as a full-stack learning project — the goal is a real, deployed app with
authentication, a relational database, and a genuine game loop, not another tutorial clone.

## Status

Early development. The foundation is in place and working:

- Database schema and migrations (users, sets, cards, collection)
- Seeding sets from the TCGdex API into PostgreSQL

In progress: the REST API, authentication, and the frontend UI. See the
[roadmap](#roadmap) for what's built and what's next.

## Tech stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (hosted on [Neon](https://neon.com/))
- **ORM:** Prisma 7, using the `@prisma/adapter-pg` driver adapter
- **Card data:** [TCGdex API](https://tcgdex.dev/)
- **Structure:** monorepo — `packages/backend` and `packages/frontend`

## How it works

A few deliberate architecture choices:

- **The frontend only talks to the backend.** The backend owns the database and
  is the only thing that calls the TCGdex API — the frontend never touches either directly.
- **External data is cached in our own database.** Sets are seeded up front; card
  data will be cached per-set on demand the first time a set is opened. This keeps
  the app fast and lets us query collections with SQL.
- **Pack opening will be server-authoritative** — the server runs the rarity roll
  and decides what you pull, so the result can't be tampered with from the client.
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
   │     ├─ features/          # feature-based modules (sets, packs, auth, ...)
   │     ├─ middleware/        # shared middleware (auth, error handling)
   │     ├─ lib/               # shared helpers (prisma client, tcgdex fetch)
   │     ├─ scripts/           # manual scripts (e.g. seeding sets)
   │     └─ index.ts           # app entry point
   └─ frontend/
      └─ src/                  # React + Vite app
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

Create `packages/backend/.env` with your Neon connection string:

```
DATABASE_URL="postgresql://USER:PASSWORD@YOUR-HOST-pooler.REGION.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require"
```

Use Neon's **pooled** connection string (the hostname contains `-pooler`), and
`sslmode=verify-full` for a properly verified TLS connection. This file is
gitignored — never commit it.

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

You can browse the seeded data with:

```bash
npx prisma studio
```

### 5. Run the frontend (dev)

```bash
cd packages/frontend
npm run dev
```

## Roadmap

- [x] Database schema (users, sets, cards, collection)
- [x] Seed sets from TCGdex
- [ ] `GET /sets` endpoint + Packs browsing page
- [ ] Pack opening — server-side weighted rarity roll
- [ ] Lazy card caching (fetch a set's cards on first open)
- [ ] Authentication (JWT) + persistent user collections
- [ ] Dex completion tracking (owned / total per set)
- [ ] Trading between users (atomic swaps)
- [ ] Docker, CI/CD, and cloud deployment

## Acknowledgements

Card and set data provided by the [TCGdex API](https://tcgdex.dev/). This project
is not produced, endorsed, supported, or affiliated with Nintendo or The Pokémon Company.