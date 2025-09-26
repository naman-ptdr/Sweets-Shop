# Sweets-Shop — Assessment README

This README is written for submission. It documents the server (backend) implementation, exact dependencies, environment variables, scripts, how to run tests, and simple API examples. A frontend client can be added later under `client/`; instructions for that are included near the end.

Table of contents
- Overview
- Quick setup (server)
- Environment variables
- Dependencies (exact list installed)
- NPM scripts & commands
- API endpoints (examples)
- Project structure
- Running tests (verified)
- Assessment checklist
- Adding a client

---

Overview
--------

This project implements a Sweets-Shop REST API using Express and MongoDB. It includes authentication (JWT), role-based authorization (admin/user), a Sweet model (CRUD + purchase/restock), and tests using Jest + Supertest with mongodb-memory-server.

Quick setup (server)
--------------------

1. Make sure you have Node.js (>=16 recommended) and npm installed.
2. From repository root, install server dependencies and run in dev mode:

```bash
cd server
npm install
npm run dev
```

The API will start on the port configured in `server/.env` or `process.env.PORT` (default shown below).

Environment variables
---------------------

Create `server/.env` with the values below (do not commit this file):

```
MONGO_URI=mongodb://localhost:27017
DB_NAME=sweets-shop-db
JWT_SECRET=replace_with_a_secure_secret
PORT=5000
```

Dependencies (exact list installed)
----------------------------------

These are the packages declared in `server/package.json` (installed during `npm install`):

Dependencies:
- bcryptjs ^3.0.2 — password hashing
- cors ^2.8.5 — CORS middleware
- dotenv ^17.2.2 — environment variable loader
- express ^5.1.0 — web framework
- jsonwebtoken ^9.0.2 — JWT handling
- mongoose ^8.18.2 — MongoDB ODM

DevDependencies:
- @babel/core ^7.28.4
- @babel/preset-env ^7.28.3
- babel-jest ^30.1.2
- jest ^30.1.3
- mongodb-memory-server ^10.2.1
- nodemon ^3.1.10
- supertest ^7.1.4

These are installed by running `npm install` inside `server/`.

NPM scripts & commands
----------------------

Defined in `server/package.json`:

- `npm start` — run `node index.js` (production start)
- `npm run dev` — run `nodemon index.js` (development with restarts)
- `npm test` — run `jest --runInBand --detectOpenHandles` (runs tests)

Recommended workflow (development)

```bash
# install dependencies
cd server && npm install

# run server in dev mode
npm run dev

# run tests
npm test
```

API endpoints (summary & examples)
---------------------------------

Base path: `/api`

Auth endpoints
- POST /api/auth/register — register a user (body: name,email,password,role)
- POST /api/auth/login — login (body: email,password) -> returns JWT

Sweets endpoints (protected)
- GET /api/sweets — list sweets (requires valid token)
- GET /api/sweets/search?name=...&category=...&minPrice=...&maxPrice=... — search
- POST /api/sweets — create sweet (admin only)
- PUT /api/sweets/:id — update sweet (admin only)
- DELETE /api/sweets/:id — delete sweet (admin only)
- POST /api/sweets/:id/purchase — purchase (user)
- POST /api/sweets/:id/restock — restock (admin)

Example: register, login, create a sweet (curl)

```bash
# register admin
curl -X POST http://localhost:5000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Admin","email":"admin@test.com","password":"admin123","role":"admin"}'

# login
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@test.com","password":"admin123"}'

# create sweet (replace <TOKEN> with JWT from login)
curl -X POST http://localhost:5000/api/sweets \
  -H "Authorization: Bearer <TOKEN>" \
  -H 'Content-Type: application/json' \
  -d '{"name":"Chocolate","category":"Candy","price":50,"quantityInStock":100}'
```

Project structure (server-focused)
---------------------------------

Root
- README.md (this file)
- .gitignore
- server/
  - index.js - server entry (starts app and exports for tests)
  - package.json, package-lock.json
  - config/db.js - MongoDB connection helper (uses MONGO_URI and DB_NAME)
  - constants.js - app-level constants
  - controllers/ - controllers for auth and sweets
  - middlewares/ - auth middleware (protect + authorize)
  - models/ - Mongoose models (User.js, Sweet.js)
  - routes/ - express routers (authRoutes.js, sweetsRoutes.js)
  - tests/ - Jest + Supertest tests (auth.test.js, sweets.test.js)

Running tests (verified)
------------------------

I ran the test suite locally as part of preparing this README. Commands used and results:

```bash
cd server
npm install
npm test
```

Result (example output seen locally):
- Test Suites: 2 passed, 2 total
- Tests: 6 passed, 6 total

If tests fail for you, ensure your `.env` contains `JWT_SECRET` and that no other process uses the test ports.

Notes
-----------------------

- The server uses `mongodb-memory-server` for tests, so you do not need a running MongoDB to run tests. To run the server in dev mode you do need a running MongoDB at `MONGO_URI` unless you point it to a cloud instance.


---

Last verified: 2025-09-26 — tests passed local on machine.
