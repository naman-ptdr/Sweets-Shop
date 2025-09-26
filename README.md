# Sweets-Shop

This repository contains a full-stack Sweets-Shop project. The backend server lives in `server/`. A frontend client will live in `client/` once you add it. This single README covers both parts so you can use it for your assessment submission.

---

## Summary (for assessor)

- Project: Sweets-Shop (Express + MongoDB backend). Tests use Jest + Supertest with an in-memory MongoDB.
- Server is implemented in `server/`. The client folder (when added) should be placed at `client/`.
- To run the project for evaluation, see the Quick Start and Test sections below.

---

## Quick start — server

1. Install dependencies and run the server:

```bash
cd server
npm install
npm run dev
```

2. Open the API (default):

The server listens on the port set in `server/index.js` (or `process.env.PORT`). Use Postman or curl to test endpoints like `/api/auth` and `/api/sweets`.

3. Environment variables

Create a `server/.env` file with:

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=sweets-shop-db
JWT_SECRET=replace_with_a_secure_secret
PORT=5000
```

Do NOT commit `.env` to source control.

---

## Project structure

Root
- README.md — this file
- .gitignore
- server/ — backend app
  - index.js — app entry (exports/starts server)
  - package.json, package-lock.json
  - config/db.js — mongoose connection helper
  - controllers/ — express controllers (auth, sweets)
  - middlewares/ — auth and other middlewares
  - models/ — Mongoose models (User, Sweet)
  - routes/ — route definitions
  - tests/ — Jest + Supertest tests

When you add a client:
- client/ — front-end app (React/Vue/Next). Keep its own package.json and scripts.

---

## Testing

Server unit/integration tests use Jest + Supertest and an in-memory MongoDB. To run tests:

```bash
cd server
npm install
npm test
```

All tests should pass for the assessment. The test suite exercises auth and sweets endpoints.

---

## Common commands

From root (recommended):

```bash
# develop server
cd server && npm run dev

# run server tests
cd server && npm test
```

If you later add a `client/`, install and run the client separately (e.g., `cd client && npm install && npm start`).

---

## Assessment checklist (what I will submit)

- [x] Backend implemented in `server/` with routes, controllers, models
- [x] Auth (JWT) + role-based middleware
- [x] Sweets CRUD + purchase/restock endpoints
- [x] Tests with Jest + Supertest and mongodb-memory-server
- [x] README with setup, env, and test instructions (this file)

Optional (if requested):
- Add `client/` folder and update this README with client setup and a combined start script.

---

## Notes & support

If anything looks wrong after you add the client (paths, package.json merge, or scripts), I can:

- Move/merge package.json to root (safe migration plan)
- Add a top-level `start` script that runs both client and server with `concurrently`
- Create a PR branch with the client and updated docs for review

Tell me if you want me to push the README and commit it to origin or create a branch instead.
