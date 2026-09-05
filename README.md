# Access Granted Academy

A freeCodeCamp/HackTheBox-style learning platform for Cybersecurity and Software Engineering, built by Aaron Frazier.

## Stack

Next.js (App Router) + TypeScript, PostgreSQL (via Docker) + Prisma, NextAuth (Auth.js) credentials login, Stripe for billing.

## Running locally

```bash
docker compose up -d        # starts Postgres on localhost:5433
npm install
npx prisma db push          # applies the schema
npm run seed                # loads tracks, coding problems, and interview questions
npm run dev                 # starts the app on http://localhost:3000
```

## What's here

- **3 learning tracks** (free forever): IT & Networking Fundamentals, Cybersecurity Fundamentals, Software Engineering & Full Stack Dev — each with 6 modules, 12 lessons (easy → hard), and 6 quizzes (36 lessons / 18 quizzes total)
- **Tiers**: Free / Pro ($10) / Max ($20), monthly or yearly, plus one-time donations
- **Coding problems**: 6 problems (Easy/Medium/Hard), graded live in the browser via an isolated Web Worker — no server-side code execution
- **Mock interview practice**: timed behavioral + technical questions with sample answers and tips (Max plan)
- **Certificates**: auto-issued when a Max-tier user completes every lesson in a track, with a public, shareable certificate page
- **Community**: per-lesson discussion comments, plus a public shareable profile page (`/u/[userId]`) showing progress, certificates, and an optional bio

## Enabling real payments

Payments are OFF by default (the pricing page shows "not configured yet" and nothing can be charged). To go live:

1. Create a Stripe account at stripe.com (this part has to be you — identity verification and bank account linkage can't be done on your behalf).
2. In the Stripe Dashboard, create 4 recurring Prices: Pro Monthly, Pro Yearly, Max Monthly, Max Yearly.
3. Fill in `.env`:
   - `STRIPE_SECRET_KEY` — from Developers → API keys
   - `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_PRICE_PRO_YEARLY`, `STRIPE_PRICE_MAX_MONTHLY`, `STRIPE_PRICE_MAX_YEARLY` — the 4 price IDs from step 2
   - `STRIPE_WEBHOOK_SECRET` — after registering a webhook endpoint (Developers → Webhooks) pointing at `<your-domain>/api/stripe/webhook`, listening for `checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted`
4. Start in Stripe **test mode** first (test API keys + test cards) before switching to live keys.

Donations use Stripe Checkout with a dynamic amount — no separate product/price needed, they just require `STRIPE_SECRET_KEY` to be set.

## Notes / what's intentionally NOT built yet

- **CompTIA-style dedicated practice exams** — right now quizzes double as cert-aligned practice; a distinct large question-bank exam mode would be a good next addition.
- **HackTheBox-style vulnerable VM labs** — the current "labs" are safe, in-browser coding exercises. Real isolated attack/defend VMs are a separate infrastructure project (container orchestration, network isolation, abuse prevention, ongoing hosting cost) — deliberately out of scope for this pass.
- **Front End / Back End / AI-specific tracks** — only IT & Networking was added as a new track this pass, on top of the original 2. Same content pattern, just needs more lessons written.
- `.env` holds local dev secrets — never commit it. Generate a fresh `AUTH_SECRET` (`openssl rand -hex 32`) and use a real hosted Postgres instance before deploying publicly.
