# Resume readiness checklist

Goal: get HoloDex to a state where you'd feel comfortable linking it in a LIA
application. Ordered by impact — top items matter most to someone skimming
your GitHub for 5 minutes.

Reviewed 2026-08-29 against the `Holoeffect` branch.

## What's already good (keep this in mind, don't second-guess it)

- Clean feature-based structure on both frontend and backend, consistent
  naming, `strict: true` in both `tsconfig.json`s.
- Real architecture decisions, not tutorial-clone stuff: server-authoritative
  pack rolls, JWT in an httpOnly cookie, external data cached in your own DB
  instead of proxying TCGdex live.
- README is genuinely good — has a status section, a roadmap, and explains
  *why* each architecture choice was made. Don't rewrite it, just keep it in
  sync as you close items below.
- No secrets committed, `.env` correctly gitignored, `.env.example` present.

## 1. Finish and commit what's in progress - DONE

You have uncommitted changes sitting in `CardFace.tsx`, `OneByOneReveal.tsx`,
and `index.css`. A reviewer who clones the repo only sees what's committed —
finish that work (or stash/branch it) so `main`/`Holoeffect` reflects a
clean, working state.

## 2. Add automated tests — biggest gap - DONE 

There are currently **zero test files** anywhere in the repo. This is the
single thing most likely to be asked about in an interview ("how did you
verify this works?") and the easiest to have no good answer for right now.
You don't need full coverage — a small, deliberate set is more convincing
than a large sloppy one:

- Backend: unit test `packs.roll.ts` / `packs.packrecipe.ts` (pure functions,
  easy to test, and it's your most interesting piece of logic — the rarity
  roll is exactly what an interviewer will ask you to explain).
- Backend: one integration test for the auth flow (register → login → `/me`
  → logout) using something like `supertest` against a test database.
- Frontend: a couple of component tests (Vitest + React Testing Library) for
  something with real logic, e.g. `usePackOpener.ts` or `AuthContext`.

Add a `test` script to both `package.json`s so `npm test` from the root
actually runs something.

## 3. Add input validation on the API - DONE

Added a combined `validateRequest` middleware
([validateRequest.ts](packages/backend/src/middleware/validateRequest.ts))
that runs a zod schema against body/params/query before the route handler,
attaches parsed data back onto `req`, and reports failures through the same
`AppError` → `errorHandler` path every other error uses (`{ success: false,
message, code, details }`) instead of a one-off shape. Wired
`RegisterSchema`/`LoginSchema` into `/auth/register` and `/auth/login`
([auth.route.ts](packages/backend/src/features/auth/auth.route.ts)). Also
swapped the service and controller signatures from hand-duplicated inline
types to the zod-inferred `RegisterInput`/`LoginInput`
([auth.service.ts](packages/backend/src/features/auth/auth.service.ts),
[auth.controller.ts](packages/backend/src/features/auth/auth.controller.ts)),
so a schema change now surfaces as a compile error instead of silently
drifting.

## 4. Fix the error handler ordering bug - DONE

In [index.ts](packages/backend/src/index.ts), `app.use(errorHandler)` is
registered *before* the `/api/health` route:

```
app.use("/api/v1/", collectionRouter)
app.use(errorHandler);        // ← registered here
app.get("/api/health", ...);  // ← but this route is added after
```

Express error middleware only catches errors from routes registered *before*
it. The health route happens to have its own try/catch so it's not currently
broken, but it's a landmine for the next route you add after this line.
Move `app.use(errorHandler)` to the very end of the file, after all routes.

## 5. Basic API hardening - DONE

- Added `helmet()` globally in [app.ts](packages/backend/src/app.ts) — CSP,
  HSTS, `X-Frame-Options`, etc.
- Added `express-rate-limit` on `/auth/register` and `/auth/login`
  ([authRateLimit.ts](packages/backend/src/middleware/authRateLimit.ts)):
  10 requests per 15-minute window per IP, disabled under `NODE_ENV=test` so
  it doesn't interfere with the integration test's repeated register/login
  calls, and reports through the same `AppError` (429, `TOO_MANY_REQUESTS`)
  as the rest of the API. Manually verified: 11th request within the window
  returns `429` with `{"success":false,"message":"Too many attempts, please
  try again later","code":"TOO_MANY_REQUESTS"}`.

## 6. Add linting - DONE

Neither package has an ESLint config. Strict TypeScript catches a lot, but
add `eslint` (+ `typescript-eslint`, + `eslint-plugin-react-hooks` on the
frontend) and a `lint` script. Cheap to add, and "has linting configured" is
one of the first things reviewers check for on a repo.

## 7. Set up CI - DONE

A `.github/workflows/ci.yml` that runs on every push/PR: `npm install`,
`npm run build --workspaces`, `npm run lint`, `npm test`. This is one of the
highest-signal, lowest-effort things you can add — a green check mark next
to your commits tells a reviewer more than the code itself does in the first
few seconds of looking.

## 8. Deploy it

README currently says deployment is still on the roadmap. For a LIA
application, a live link you can put directly in your CV/LinkedIn matters
more than almost anything else on this list — being able to say "try it
here" beats a wall of code every time. Cheapest path given your stack:

- Frontend: Vercel or Netlify (static Vite build).
- Backend: Render or Fly.io free tier (you're already on Neon for Postgres,
  so no DB migration needed).

Add the live URL to the top of the README.

## 9. Polish for a first-time visitor

- Add 2-3 screenshots or a short GIF of the pack-opening flow to the README.
  Reviewers skim; a picture of the actual product gets more attention than
  the text below it.
- Fix the small rough edges that are visible in a 5-minute read-through:
  the `succsess` typo in
  [collection.controller.ts](packages/backend/src/features/collection/collection.controller.ts#L19)
  (inconsistent with `success` used everywhere else), and the plain-text
  `Loading...` in
  [ProtectedRoute.tsx](packages/frontend/src/components/ProtectedRoute.tsx).
  None of these are bugs, but a careful reviewer notices when the response
  shape isn't consistent across endpoints.

## Not urgent — already tracked in your own README roadmap

Don't duplicate effort chasing these before the list above; they're feature
completeness, not resume-readiness, and you already know about them:

- Dex-completion tracking
- Trading between users
- Lazy card caching instead of the manual seed script

## Suggested order

1. Commit/clean up in-progress changes (#1)
2. Tests + validation + the error-handler fix (#2, #3, #4) — these are the
   substance a technical reviewer will actually check
3. Lint + CI (#6, #7) — cheap, high visual signal
4. Deploy + README polish (#8, #9) — what a non-technical or time-pressed
   reviewer sees first
5. Security hardening (#5) — good to have, least likely to be checked first
