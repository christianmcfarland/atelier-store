# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Next.js version

This is Next.js 16 (App Router), and its APIs and conventions differ from older versions. Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` (`01-app/` covers the App Router) and follow any deprecation notices. `next.config.ts` turns on `cacheComponents` and `partialPrefetching`. With Cache Components on, routes and `GET` handlers run at request time by default and are prerendered only when they don't touch uncached or runtime data; use `'use cache'` / `cacheLife` to cache. Read `01-app/01-getting-started/08-caching.md` before building data-fetching pages.

## Environment

- Node 22 (`.nvmrc`). The Better Auth CLI used by `auth:generate` needs Node ≥22.12.
- Copy `.env.example` to `.env.local`. Next.js and `drizzle.config.ts` both read `.env.local` (then `.env`).
- `src/db/index.ts` throws at import time if `DATABASE_URL` is unset. Any route that imports the db or auth, including `next build`, needs it set.

## Commands

```bash
npm run dev            # dev server (Turbopack)
npm run build          # production build
npm run lint           # ESLint (flat config, eslint-config-next)
npm run typecheck      # tsc --noEmit
npm run auth:generate  # write Better Auth tables to src/db/auth-schema.ts
npm run db:generate    # drizzle-kit: SQL migrations into ./drizzle
npm run db:migrate     # apply migrations to Neon
npm run db:push        # push schema directly (prototyping)
npm run db:seed        # upsert the launch catalog (src/db/seed-data.ts); safe to re-run
npm run db:studio      # Drizzle Studio
```

There is no test framework set up yet.

## Architecture

The stack is Next.js App Router, TypeScript, Tailwind v4, Better Auth, Drizzle ORM and Neon Postgres. The `@/*` import alias maps to `src/*`.

How the data and auth layers connect:

- `src/db/schema.ts` is the single Drizzle schema entry point. `drizzle.config.ts` reads only this file, and both `src/db/index.ts` and the Better Auth adapter import it. Add new tables here, or put them in sibling files and re-export them from here.
- `src/db/index.ts` exports `db`, which uses the Neon **HTTP** driver (`drizzle-orm/neon-http`). That driver does not support interactive transactions. If you need them, switch to the Neon WebSocket `Pool` driver.
- `src/lib/auth.ts` is the server-only Better Auth instance. It uses `drizzleAdapter(db, { provider: "pg", schema })`, so Better Auth expects its tables to be in the schema object. `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` come from the environment. `nextCookies()` lets Server Actions set auth cookies and must stay **last** in `plugins`.
- `src/app/api/auth/[...all]/route.ts` mounts all Better Auth endpoints with `toNextJsHandler(auth)`.
- `src/lib/auth-client.ts` is the browser client (`better-auth/react`). It defaults to the same origin, so don't import `src/lib/auth.ts` from client components.

The auth tables (`user`, `session`, `account`, `verification`) don't exist yet, and the build logs a "Missing tables" warning until they do. To add them:

1. Run `npm run auth:generate`.
2. Add `export * from "./auth-schema";` to `src/db/schema.ts`.
3. Run `npm run db:generate`, then `npm run db:migrate`.

Re-run `auth:generate` whenever you add Better Auth plugins that add tables or columns.

No sign-in methods (email/password, OAuth) are enabled in `auth.ts` yet.

## Database conventions

- **Schema files:** one file per domain (`src/db/products.schema.ts`), re-exported from `schema.ts`. Define `relations()` for every foreign key so `db.query.*` relational queries work.
- **Columns:** snake_case in SQL, camelCase in TS, with names written out explicitly. Use integer identity primary keys. A unique `slug` is the public key used in URLs. Timestamps are `timestamptz`, and `updated_at` uses `$onUpdate`.
- **Money and quantities:** money is integer cents in `*_cents` columns. Money and quantity columns get a `CHECK (>= 0)`.
- **Foreign keys:** `ON DELETE RESTRICT` for reference data (categories), `ON DELETE CASCADE` for child rows a parent owns (images).
- **Ordered children:** ordered child lists go in their own table with `position` and `UNIQUE (parent_id, position)`, not in jsonb.
- **Stock:** stock is `products.stock_quantity`. There are no variants yet. Carts, orders, payments, reviews, wishlists and variants are out of scope until asked for.
- **Data access:** only server modules in `src/lib` (currently `products.ts`) import `db`. Each query is `'use cache'` with `cacheLife` and a `cacheTag` (`"products"`). Under Cache Components, an uncached DB read during prerender fails the build. Queries map rows to the app types in `catalog.ts`, and `catalog.ts` must never import `db` because client components import it.
- **Migrations:** run `db:generate`, review the SQL, then `db:migrate`, and commit `drizzle/`. Don't use `db:push` for real schema changes.
- **Seeding:** `src/db/seed.ts` upserts by natural key (slug, or parent + position), so it can be re-run. It loads dotenv before dynamically importing `./index`.
- **Builds:** `next build` needs a migrated **and seeded** database, because `generateStaticParams` must return at least one product slug.

## Design system

Tailwind v4 is configured in CSS only; there is no `tailwind.config`. `src/app/globals.css` imports, in order:

- `src/styles/theme.css`: tokens. Tailwind's default colors, type sizes and radii are reset, so `text-sm`, `bg-zinc-*` and `rounded-lg` don't exist. Use the tokens instead: `text-ink`/`bg-canvas`/`border-line`, `text-body`/`text-title-*`/`text-display-*`, and `rounded-xs`. Responsive tokens (type sizes, `gutter`, `section`, `header`) step up in `:root` media queries at the bottom of the file, so they don't need `lg:` prefixes.
- `src/styles/base.css`: element defaults, plus `.theme-inverse`, which swaps the semantic color variables for a subtree.
- `src/styles/utilities.css`: primitives written as `@utility`, so variants apply to them: `page-container`, `narrow-container`, `page-grid`, `product-grid`, `section-y`, `media-frame`, `btn` + `btn-primary|secondary|glass`, `link`, `link-draw`, `link-muted` and `eyebrow`.

Semantic colors must stay in the `@theme inline` block that maps them to the `:root` variables. If they aren't inline, `.theme-inverse` stops working.

## Storefront

Products come from the database through `src/lib/products.ts` (see Database conventions). `src/lib/catalog.ts` holds the shared types, `formatPrice`/`getStockStatus` and the static editorial content (hero, collections, stories, navigation). Photos are from Unsplash. Most links point to `#` because no collection routes exist yet. `next.config.ts` allows remote images only from `images.unsplash.com`. Use the object form of `remotePatterns`: the `new URL()` form rejects query strings, and the Unsplash crop/format params need them. `src/app/products/[slug]/page.tsx` is the product page. `generateStaticParams` prerenders every product slug from the database. An unknown slug calls `notFound()` after the page has started streaming (Cache Components behavior), so it renders the 404 UI with `noindex` but an HTTP 200 status; a true 404 needs a slug check in Proxy. Stock state comes from `getStockStatus()` in `catalog.ts`: 0 is sold out, and 3 or fewer is low stock. Close-up gallery images are Unsplash focal-point crops of the main photo (`unsplashDetail`). `SiteHeader` (client component) sits over the hero with a transparent background on paths in `OVERLAY_PATHS`, and turns solid once the page scrolls.

If a CSS change produces an "unknown utility" error that doesn't match the source, delete `.next/` (Turbopack caches stale Tailwind output).
