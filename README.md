# HoloDex

A full-stack Pokémon TCG pack-opening and collection tracker. Browse playable
sets, open set-aware booster packs, build a persistent binder, and follow your
collection's completion and market value from a personal dashboard.

Card, set, image, and pricing data comes from the community-run
[TCGdex API](https://tcgdex.dev/).

## Current features

- Account registration and login with JWT sessions stored in an HTTP-only cookie
- Guest pack opening, with pulls saved automatically for signed-in users
- Server-authoritative, set-specific pack recipes and weighted rarity rolls
- One-by-one card reveals, an open-all option, and a pack summary
- Variant-aware collections for normal, reverse-holo, and holo cards
- Collection browsing by set with completion progress, filtering, sorting, and pagination
- A trainer dashboard with cards owned, packs opened, collection value, average value per pack, closest sets to completion, rarity breakdown, and recent pulls
- TCGplayer market and Cardmarket trend prices where TCGdex provides them
- Responsive desktop and mobile layouts

Trading is represented in the UI but is not implemented yet.

## Tech stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router 8
- **Backend:** Node.js, Express, TypeScript, Zod
- **Authentication:** JWT, bcrypt, HTTP-only cookies, and rate-limited auth routes
- **Database:** PostgreSQL with Prisma 7 and the `@prisma/adapter-pg` driver adapter
- **Testing:** Vitest, Testing Library, and Supertest
- **Data source:** [TCGdex API](https://tcgdex.dev/)
- **Structure:** npm workspaces monorepo

## Architecture

The browser communicates only with the Express API. The backend owns database
access, imports data from TCGdex, generates every pack result, and persists pulls
inside a transaction. Card images remain on TCGdex's CDN; HoloDex stores their
base URLs rather than image files.

Set and card ingestion is currently an explicit seed workflow. Pack recipes are
defined in code, making pull composition and rarity odds independently testable
and allowing different TCG eras to use different collation rules.

```text
HoloDex/
├─ .env.example
├─ package.json                 # workspace scripts
└─ packages/
   ├─ backend/
   │  ├─ prisma/
   │  │  ├─ migrations/       # database version history
   │  │  └─ schema.prisma     # application data model
   │  └─ src/
   │     ├─ features/          # auth, sets, packs, collection, dashboard
   │     ├─ middleware/        # auth, validation, rate limiting, errors
   │     ├─ scripts/           # set, card/price, and pack-image imports
   │     ├─ app.ts             # Express application
   │     └─ index.ts           # server entry point
   └─ frontend/
      └─ src/
         ├─ components/        # shared layout and navigation
         ├─ context/           # authentication state
         ├─ features/          # feature-based pages, UI, loaders, and APIs
         ├─ lib/               # API and image helpers
         └─ routes/            # React Router configuration
```

## Getting started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm
- A PostgreSQL database, such as [Neon](https://neon.com/)

### 1. Clone and install

```bash
git clone https://github.com/Awreally/HoloDex.git
cd HoloDex
npm install
```

### 2. Configure the backend

Copy the example environment file into the backend package:

```bash
cp .env.example packages/backend/.env
```

Then provide at least these values in `packages/backend/.env`:

```dotenv
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
JWT_SECRET="replace-with-a-long-random-secret"
```

Optional settings and their defaults:

```dotenv
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_EXPIRES_IN=7d
```

If you use Neon, use its pooled connection string. Never commit the completed
`.env` file.

### 3. Create the database schema

```bash
cd packages/backend
npm run db:generate
npm run db:migrate
```

### 4. Import TCG data

From `packages/backend`, seed the set catalogue, cards and prices, then pack
artwork:

```bash
npx tsx src/scripts/seed-sets.ts
npx tsx src/scripts/seed-cards.ts
npx tsx src/scripts/seed-pack-images.ts
```

The current card and pack-image scripts are configured for Team Rocket
(`base5`). To import another set, update `SET_IDS` in `seed-cards.ts`, add an
image mapping in `seed-pack-images.ts`, and ensure the set has a suitable recipe
in `src/features/packs/recipes/`.

Finally, make imported sets visible in the application:

```bash
npm run db:studio
```

In Prisma Studio, set `Set.playable` to `true` for every set that has cards and
should appear in HoloDex. The import scripts use upserts and are safe to run
again when refreshing data.

### 5. Start the app

Return to the repository root and launch both workspaces:

```bash
cd ../..
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)
- Health check: [http://localhost:3000/api/health](http://localhost:3000/api/health)

Vite proxies `/api` requests to the backend during local development.

## Available commands

Run these from the repository root:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the frontend and backend in watch mode |
| `npm run build` | Generate Prisma Client and build both workspaces |
| `npm run lint` | Lint both workspaces |
| `npm test` | Run all backend and frontend tests once |

Backend database helpers can be run from `packages/backend`:

| Command | Description |
| --- | --- |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Create and apply a development migration |
| `npm run db:push` | Push the schema without creating a migration |
| `npm run db:studio` | Open Prisma Studio |

## API overview

All application endpoints are under `/api/v1` unless noted otherwise.

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Public | Create an account and session |
| `POST` | `/auth/login` | Public | Start a session |
| `POST` | `/auth/logout` | Public | Clear the session cookie |
| `GET` | `/auth/me` | Required | Return the current user |
| `GET` | `/sets` | Public | List playable sets and pack sizes |
| `POST` | `/sets/:setId/open` | Optional | Open a pack; save it when signed in |
| `GET` | `/collection/sets` | Required | List collection progress by set |
| `GET` | `/collection/sets/:setId/cards` | Required | Return a filtered, paginated binder |
| `GET` | `/dashboard` | Required | Return dashboard statistics |
| `GET` | `/api/health` | Public | Check API and database health |

## Roadmap

- [x] Authentication and persistent user collections
- [x] Server-authoritative, era-aware pack opening
- [x] Card variants, set filtering, sorting, and pagination
- [x] Set completion tracking and dashboard analytics
- [x] Collection pricing and pack-opening history
- [ ] Trading between users with atomic swaps
- [ ] Automated card ingestion and price refreshes
- [ ] Admin tooling for playable sets, pack artwork, and recipes
- [ ] Docker, CI/CD, and cloud deployment

## Acknowledgements

Card, set, image, and pricing data is provided by the
[TCGdex API](https://tcgdex.dev/). HoloDex is an unofficial fan project and is
not produced, endorsed, supported, or affiliated with Nintendo, Creatures Inc.,
Game Freak, or The Pokémon Company.
