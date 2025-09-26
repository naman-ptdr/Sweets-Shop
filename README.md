# Sweet Shop Management System — TDD Kata Implementation

A comprehensive full-stack Sweet Shop Management System built following Test-Driven Development principles. This project features a robust REST API with JWT authentication, role-based authorization, inventory management, and a modern React frontend with beautiful UI/UX design.

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


Overview

Frontend (client) — Setup & Notes
---------------------------------

This repository also includes a modern React frontend in the `client/` folder. The UI was simplified to a clean, neutral palette and uses the images stored in `client/src/assets` (hero and product images).

Quick setup (client)
1. From the repository root, install and run the client:

```bash
cd client
npm install
npm run dev
```

2. The Vite dev server will start (usually on http://localhost:5173). The frontend talks to the backend API at the base path configured in `client/src/services/api.js` — update the URL there if your server runs on a different host/port.

Design & UX changes made
- Simplified global CSS to a neutral, accessible palette in `client/src/index.css`.
- Reworked card, button, and input utilities to improve spacing, contrast, and consistency.
- Kept component structure and state logic intact to avoid breaking behavior.
- Images used are the ones in `client/src/assets` (no external images used).

Screenshots
-----------

Add screenshots of the running app here (replace placeholders):

- Screenshot: Hero section — `screenshots/hero.png`
- Screenshot: Sweets collection — `screenshots/collection.png`
- Screenshot: Dashboard (admin) — `screenshots/dashboard.png`

## My AI Usage

This project was developed with significant assistance from AI tools to accelerate development and ensure best practices, as encouraged by the TDD Kata requirements.

### AI Tools Used
- **Amazon Q Developer**: Primary AI assistant for code generation, debugging, and architectural decisions
- **GitHub Copilot**: Code completion and boilerplate generation

### How AI Was Used

#### Backend Development
- **API Structure**: Used AI to design RESTful API endpoints following TDD requirements
- **Authentication**: AI assisted in implementing JWT-based authentication with proper security practices
- **Database Models**: Generated Mongoose schemas for User and Sweet models with validation
- **Error Handling**: AI helped implement comprehensive error handling across all endpoints
- **Testing**: Generated test cases for authentication and sweet management endpoints
- **Search Functionality**: Implemented advanced search with name, category, and price range filters

#### Frontend Development
- **Component Architecture**: AI assisted in creating modern React component structure
- **UI/UX Design**: Generated beautiful, responsive UI components with modern design patterns
- **State Management**: Implemented proper state management for authentication and data fetching
- **API Integration**: Created robust API client with error handling and loading states
- **Purchase Flow**: Built real-time inventory management with optimistic updates
- **Responsive Design**: AI helped create mobile-first responsive layouts

#### Specific AI Contributions
1. **Authentication System**: Complete auth flow including registration, login, and protected routes
2. **Sweet Management**: CRUD operations with proper validation and error handling
3. **Purchase Functionality**: Real-time inventory management with stock validation
4. **Search & Filter**: Advanced search functionality with category filtering
5. **UI Components**: Modern, accessible UI components with animations and micro-interactions
6. **CSS Design System**: Comprehensive design system with gradients, animations, and responsive design
7. **Testing Suite**: Generated comprehensive test cases covering edge cases and error scenarios

### AI Impact on Workflow

**Positive Impacts:**
- **Speed**: Reduced development time by ~70% through rapid prototyping and boilerplate generation
- **Quality**: AI suggested best practices for security, performance, and maintainability
- **Consistency**: Maintained consistent code style and patterns throughout the project
- **Testing**: Generated comprehensive test coverage including edge cases
- **Documentation**: AI helped create detailed documentation and inline comments
- **Modern Patterns**: Learned and implemented modern React hooks and patterns

**Learning Experience:**
- AI served as a pair programming partner, explaining concepts and suggesting improvements
- Discovered new CSS techniques and design patterns for modern web applications
- Gained insights into API security best practices and JWT implementation
- Learned advanced MongoDB query patterns for search functionality

**Human Oversight:**
- All AI-generated code was reviewed and modified to fit specific project requirements
- Business logic and user experience decisions were made independently
- AI suggestions were evaluated for security, performance, and maintainability
- Custom styling and branding decisions were human-driven
- Test cases were validated against actual application behavior

### Reflection

AI tools significantly enhanced productivity while maintaining high code quality. The combination of AI assistance and human oversight resulted in a robust, well-tested application that fully meets all TDD Kata requirements. AI was particularly valuable for:

- Generating boilerplate code that follows best practices
- Implementing comprehensive error handling and validation
- Creating beautiful, accessible UI components
- Writing thorough test coverage
- Maintaining consistent code style and documentation

The project demonstrates how AI can be effectively used as a development accelerator while ensuring all code meets professional standards and requirements.

Commit notes
------------

When AI was used to generate or assist with code, that was recorded in the commit message as a co-author following the project rules (e.g., "Co-authored-by: AI Tool Name <AI@users.noreply.github.com>").

Next steps
----------

- (Optional) Further polish the design system and add a small CSS variables theme switcher for light/dark mode.
- Add screenshots to `screenshots/` and commit them to the repo.
- Run the test suite and a quick lint step after visual edits.
--------

## Overview

This project implements a comprehensive Sweet Shop Management System following TDD principles. It features:

**Backend (Node.js/Express):**
- RESTful API with JWT authentication
- Role-based authorization (admin/user)
- MongoDB database with Mongoose ODM
- Complete CRUD operations for sweets
- Purchase and restock functionality
- Advanced search with filters
- Comprehensive test suite with Jest + Supertest

**Frontend (React):**
- Modern single-page application
- Beautiful, responsive UI/UX design
- Real-time inventory management
- User authentication and authorization
- Search and filter functionality
- Admin dashboard for sweet management
- Purchase flow with stock validation

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
