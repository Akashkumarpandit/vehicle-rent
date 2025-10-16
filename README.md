# Rent Vehicle

Backend for the "rent vehicle" app using Node.js, Express, and MongoDB.

## Description
- Vehicle Browse: endpoints to list vehicles.
- Booking UI: endpoints to create bookings and check availability.
- User Profiles: Firebase Auth token verification (server-side) with minimal user model.
- Map Integration: Google Maps API via server proxy to display locations and compute distances.
- Payment Handling: Stripe test payments via Payment Intents.
- Smart Destination Suggestion: LLM-backed suggestions endpoint (OpenAI if configured) based on season, weather, interests.

## Style Guidelines (for the client app)
- Primary: Electric Blue (#7DF9FF)
- Background: Light Gray (#E0E0E0)
- Accent: Lime Green (#BFFF00)
- Font: Inter
- UI: minimalist outline icons, card-based listings, subtle transitions.

## Setup
1) Create .env from .env.example and fill values.
2) Start dev server: npm run dev

## API Sketch
- GET /health
- GET /vehicles
- POST /bookings
- GET /maps/distance?orig=lat,lng&dest=lat,lng
- POST /payments/create-intent { amount, currency }
- GET /suggestions?lat=&lng=&month=&interests=

