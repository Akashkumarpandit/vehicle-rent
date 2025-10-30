# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview
Backend API for a vehicle rental app built with Node.js (Express) and MongoDB (Mongoose). Features include vehicle browsing, bookings, user profile retrieval via Firebase Auth, Google Maps distance proxy, Stripe Payment Intents, and optional LLM-backed destination suggestions.

## Commands
- Install dependencies:
  ```bash
  npm install
  ```
- Start in development (with reload):
  ```bash
  npm run dev
  ```
- Start in production:
  ```bash
  npm start
  ```
- Tests (none configured yet):
  ```bash
  npm test
  # Outputs: "No tests yet" and exits 0
  ```
- Environment setup:
  ```bash
  cp .env.example .env
  # Edit .env with your values (see Variables below)
  ```

Notes
- Port is controlled by `PORT` (defaults to 4000). MongoDB connection string is `MONGODB_URI`.
- No linter or formatter is configured in this repo.
- No test framework is configured; running a single test is not applicable until tests are added.

## Architecture (big picture)
- Entry point: `src/index.js`
  - Loads environment (`dotenv`), connects to MongoDB (`src/config/db.js`), then starts the Express app.
- HTTP app: `src/app.js`
  - Middleware: `cors`, `express.json`, `morgan` (dev logging).
  - Routes:
    - `/health` — simple readiness check.
    - `/vehicles` — list/create vehicles.
    - `/bookings` — create bookings.
    - `/users` — authenticated user profile (`/users/me`).
    - `/payments` — Stripe Payment Intents.
    - `/maps` — Google Maps Distance Matrix proxy.
    - `/suggestions` — destination suggestions (OpenAI optional).
- Controllers: `src/controllers/*`
  - `vehiclesController` — basic CRUD stubs (list/create).
  - `bookingsController` — create booking records.
  - `usersController` — returns/upserts current user (requires auth middleware).
  - `paymentsController` — creates Stripe Payment Intent from request `{ amount, currency }`.
  - `mapsController` — computes distance/duration between two coordinates via Distance Matrix API.
  - `suggestionsController` — returns canned suggestions or queries OpenAI if configured.
  - `authController.verifyAuth` — Firebase Admin token verification middleware (initializes from env once).
- Models: `src/models/*` (Mongoose)
  - `User` — minimal profile keyed by Firebase UID.
  - `Vehicle` — vehicle attributes; includes GeoJSON `location` with 2dsphere index.
  - `Booking` — references `User` and `Vehicle`, tracks dates, price, status.

## External services and variables
Define these in `.env` (see `.env.example`):
- Core
  - `PORT` — API port (default 4000)
  - `MONGODB_URI` — MongoDB connection string
- Stripe
  - `STRIPE_SECRET_KEY` — secret key for Payment Intents
- Google Maps
  - `GOOGLE_MAPS_API_KEY` — used by Distance Matrix endpoint
- Firebase Admin (for auth middleware)
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY` — use literal `\n` characters for newlines; code replaces `\\n` with real newlines at runtime
- OpenAI (optional for suggestions)
  - `OPENAI_API_KEY`

## Development workflow highlights
- Start MongoDB and ensure `MONGODB_URI` is reachable before `npm run dev`.
- Only `/users/me` is protected by `verifyAuth` currently; other routes are open or marked TODO.
- Health check: `GET /health` returns `{ ok: true }` when the server is up.
