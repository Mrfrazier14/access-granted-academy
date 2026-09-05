# Access Granted Academy

Free learning platform for Cybersecurity and Software Engineering, built by Aaron Frazier.

## Stack

Next.js (App Router) + TypeScript, PostgreSQL (via Docker) + Prisma, NextAuth (Auth.js) credentials login.

## Running locally

```bash
docker compose up -d        # starts Postgres on localhost:5433
npm install
npx prisma migrate dev      # applies the schema
npm run seed                # loads the Cybersecurity + SWE course content
npm run dev                 # starts the app on http://localhost:3000
```

## What's here

- Sign up / sign in (email + password, hashed with bcrypt)
- Two learning tracks: **Cybersecurity Fundamentals** and **Software Engineering & Full Stack Dev**, each with 3 modules and 6 lessons
- Lesson pages with a "Mark as Complete" button that tracks per-user progress
- Quizzes tied to specific lessons, graded server-side (correct answers are never sent to the client before submission)
- A dashboard showing per-track progress and quiz history

## Notes

- `.env` holds local dev secrets (`DATABASE_URL`, `AUTH_SECRET`) — never commit this file to a public repo. Before deploying anywhere public, generate a fresh `AUTH_SECRET` (e.g. `openssl rand -hex 32`) and point `DATABASE_URL` at a real hosted Postgres instance.
- The local Postgres container runs on port `5433` (not `5432`) to avoid conflicting with a native Postgres install on this machine.
