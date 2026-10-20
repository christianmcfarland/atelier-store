# Atelier Store

Next.js (App Router) + TypeScript + Tailwind CSS, with Better Auth, Drizzle ORM and Neon Postgres.

## Setup

Requires Node 22 (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL and BETTER_AUTH_SECRET
npm run dev
```

## Scripts

| Script                  | Purpose                                            |
| ----------------------- | -------------------------------------------------- |
| `npm run dev`           | Start the dev server                               |
| `npm run build`         | Production build                                   |
| `npm run lint`          | ESLint                                             |
| `npm run typecheck`     | TypeScript check                                   |
| `npm run auth:generate` | Generate Better Auth tables into `src/db/auth-schema.ts` |
| `npm run db:generate`   | Generate SQL migrations from the Drizzle schema    |
| `npm run db:migrate`    | Apply migrations to Neon                           |
| `npm run db:push`       | Push the schema directly (prototyping)             |
| `npm run db:studio`     | Open Drizzle Studio                                |

## Layout

```
src/
  app/api/auth/[...all]/route.ts   Better Auth route handler
  db/index.ts                      Drizzle client (Neon HTTP driver)
  db/schema.ts                     Drizzle schema (empty)
  lib/auth.ts                      Better Auth server config
  lib/auth-client.ts               Better Auth React client
drizzle.config.ts                  drizzle-kit config
```
