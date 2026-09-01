# Resume readiness checklist

Goal: get HoloDex to a state where you'd feel comfortable linking it in a LIA
application. Ordered by impact — top items matter most to someone skimming
your GitHub for 5 minutes.

Reviewed 2026-09-01 against `dev` (commit `4a40043`).

## Verdict

**Not yet — but closer than it feels.** The engineering underneath is
genuinely good and would hold up in an interview: real auth, a
server-authoritative pack roll, input validation, tests that pass, CI that's
green, no secrets committed. That's the hard part and it's done.

What's missing is the part a non-technical (or 30-second-skim) reviewer
actually judges first: does it work when I click around, and does it work on
my phone. Right now the answer to both is "partially," and that's what
you should close before putting a link on a CV. None of it is architecturally
hard — it's 1-2 focused days, not a rewrite.

## What's already good (confirmed working today, don't second-guess it)

- `npm run build --workspaces`, `npm test --workspaces`, and lint all pass
  clean right now — backend 9/9 tests, frontend 8/8.
- CI (`.github/workflows/ci.yml`) runs install → build → lint → test on every
  push/PR to `main`/`dev`.
- Zod validation on auth routes, a real `errorHandler`, rate limiting on
  login/register, `helmet()` — this is more hardening than most portfolio
  projects bother with.
- Clean feature-based structure on both frontend and backend, `strict: true`
  in both `tsconfig.json`s.
- README is genuinely good — status section, roadmap, explains *why* each
  architecture choice was made. Keep it in sync as you close items below.

## 1. Dead buttons — fix or remove before anyone clicks around

A reviewer's first move is to click every button. Right now three don't do
anything, in a first-time visitor's direct line of sight:

- **Search bar** ([TopNavBar.tsx:22-26](packages/frontend/src/components/layout/navigation/TopNavBar.tsx#L22-L26))
  — plain `<input>`, no `onChange`, no state, no submit handler.
- **"Shop Packs" button** ([SideNavBar.tsx:21-26](packages/frontend/src/components/layout/navigation/SideNavBar.tsx#L21-L26))
  — no `onClick`, no `Link`, goes nowhere.
- **Coin balance / wallet icon** ([TopNavBar.tsx:35-53](packages/frontend/src/components/layout/navigation/TopNavBar.tsx#L35-L53))
  — hardcoded "5,000", also unwired.

You don't need to build a search feature or an economy system to fix this.
Two honest options:

- **Wire it minimally**: search → filter the collection/sets you already
  have client-side; "Shop Packs" → `<Link to="/packs">`, which already
  exists and works.
- **Remove it from view**: if it's not going to work before you apply, cut
  it. A smaller app that does everything it shows beats a bigger one with
  dead UI — the second is what makes a reviewer stop trusting the rest of
  the app.

Either is fine. Leaving it as-is is the one option that costs you.

## 2. Not mobile-friendly — currently closer to "unusable" than "not polished"

This is more serious than it might sound, worth being specific about:

- **`SideNavbar`** ([SideNavBar.tsx:6](packages/frontend/src/components/layout/navigation/SideNavBar.tsx#L6))
  is `hidden ... md:flex` — below the `md` breakpoint it disappears
  entirely, with no hamburger menu or other replacement. On a phone there is
  **no way to navigate to Packs, Collection, Sets, or Trade** — the app is
  only reachable from the Dashboard.
- The search bar in `TopNavBar` is also `hidden md:block` — same story.
- **`<main>`** ([RootLayout.tsx:19](packages/frontend/src/components/layout/RootLayout.tsx#L19))
  has a flat `p-20` (5rem / 80px on all sides, every breakpoint) — on a
  360-390px-wide phone screen that's roughly 40% of the viewport width
  consumed by padding alone before any content renders.
- Only 3 of 36 `.tsx` files use any responsive (`sm:`/`md:`/`lg:`) classes
  at all — this isn't a few rough edges, it's that mobile layout wasn't
  addressed yet.

Given how many people will open a CV link on their phone, this is worth
fixing before item #1 if you're picking one thing to prioritize. Concretely:
add a mobile nav (hamburger → drawer/sheet reusing `navSections`, or a
bottom tab bar — either is a well-worn pattern), make `main`'s padding
responsive (`p-4 md:p-20` or similar), and give the search bar a mobile
variant (icon that expands, or a dedicated `/search` route) instead of just
hiding it.

## 3. Deploy it

README still says deployment is on the roadmap. For a LIA application, a
live link you can put directly in your CV/LinkedIn matters more than almost
anything else on this list — "try it here" beats a wall of code every time.
Cheapest path given your stack:

- Frontend: Vercel or Netlify (static Vite build).
- Backend: Render or Fly.io free tier (you're already on Neon for Postgres,
  so no DB migration needed).

Add the live URL to the top of the README. Note this pairs with #1 and #2 —
don't deploy dead buttons and a broken mobile layout, fix those first so the
live link is worth clicking.

## 4. Polish for a first-time visitor

- Add 2-3 screenshots or a short GIF of the pack-opening flow to the README.
  Reviewers skim; a picture of the actual product gets more attention than
  the text below it. Do this after #2 so the screenshots include a mobile
  shot that actually looks good.
- Small rough edges from a careful read-through: the `succsess` typo in
  [collection.controller.ts:19](packages/backend/src/features/collection/collection.controller.ts#L19)
  (inconsistent with `success` used everywhere else), and the plain-text
  `Loading...` in
  [ProtectedRoute.tsx](packages/frontend/src/components/ProtectedRoute.tsx).

## Not urgent — already tracked in your own README roadmap

Don't duplicate effort chasing these before the list above; they're feature
completeness, not resume-readiness, and you already know about them:

- Dex-completion tracking
- Trading between users
- Lazy card caching instead of the manual seed script

## Suggested order

1. Mobile navigation + layout padding (#2) — the highest-impact fix, since a
   phone visitor currently can't use the app at all.
2. Dead buttons — wire or hide (#1).
3. Deploy (#3) — now the live link actually holds up to a click-through.
4. README screenshots + small polish (#4).

## Also fixed since the last pass of this doc (2026-08-29)

Tests, input validation, the error-handler ordering bug, rate
limiting/helmet, ESLint, and CI were all flagged in the previous version of
this checklist and are now confirmed done and passing. Good progress — the
backend/infra half of this list is essentially closed out. What's left is
almost entirely frontend-facing.
