```md name=README.md
# AI Recipe Generator

A lean weekend-buildable web app inspired by AiCook: users enter ingredients they already have, pick a cuisine or meal vibe, and generate a recipe with steps, summary, and grocery-simplified instructions.

## Stack

- Next.js 14
- Tailwind CSS
- Prisma + SQLite
- NextAuth credentials auth
- Stripe test mode ready

## Features

- Ingredient-to-recipe generation loop
- Dashboard with history, search, and filter
- Empty states and responsive cards
- Modern landing page
- Email/password auth
- Paid plan flow with Stripe test mode fallback
- Local database persistence

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

3. Update the env values in `.env`.

4. Generate the database schema:

   ```bash
   npx prisma db push
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000

## Environment variables

```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_PRO_PRICE_ID=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Notes

- `OPENAI_API_KEY` is optional. If omitted, the app falls back to a built-in local recipe generator so the product still works.
- Stripe values are optional for local dev. Without them, the checkout route uses a test-mode demo flow and updates the user to the Pro plan locally.

## Deployment

### Vercel + Neon/Postgres

1. Push this repo to GitHub.
2. Import into Vercel.
3. Set environment variables in Vercel.
4. Add a production Postgres URL for `DATABASE_URL`.
5. Run Prisma migrate on deploy:

   ```bash
   npx prisma db push
   ```

### Production notes

- Use a real production database rather than SQLite.
- Add Stripe product/price IDs for live billing.
- Register `NEXTAUTH_URL` and `NEXTAUTH_SECRET` for production.
- Keep `STRIPE_WEBHOOK_SECRET` configured for actual invoice/subscription events.

## Auth and plan flow

- Sign up with email/password.
- Dashboard requires login.
- Pricing page offers a Pro plan.
- Cart/checkout route is ready for Stripe test mode and can be swapped to a live checkout when keys are added.

## Project structure

```bash
src/
  app/
  components/
  lib/
prisma/
```
````
