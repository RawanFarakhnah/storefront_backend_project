# Storefront Backend Project

## Overview

This is a Node.js + Express REST API connected to a PostgreSQL database. It supports JWT authentication, database migrations, and automated testing using Jasmine.

---

## Tech Stack

- Node.js / Express
- PostgreSQL
- dotenv
- db-migrate
- jsonwebtoken
- bcrypt
- jasmine

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RawanFarakhnah/storefront_backend_project.git
cd storefront_backend_project
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the project root:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=shoppes
POSTGRES_TEST_DB=shoppes_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123

ENV=test
PORT=3001

BCRYPT_PASSWORD=our-greatest-glory
SALT_ROUNDS=10
TOKEN_SECRET=create-your-story
```

---

## Database Configuration

`database.json` (used by db-migrate):

```json
{
  "dev": {
    "driver": "pg",
    "host": "localhost",
    "port": 5432,
    "database": "shoppes",
    "user": "postgres",
    "password": "password123"
  },
  "test": {
    "driver": "pg",
    "host": "localhost",
    "port": 5432,
    "database": "shoppes_test",
    "user": "postgres",
    "password": "password123"
  }
}
```

---

## Running PostgreSQL (Docker)

Start the database container:

```bash
docker-compose up -d
```

---

## Database Setup

### 1. Create Databases

Ensure the following databases exist:

* shoppes (development)
* shoppes_test (testing)

If needed, create the test database manually inside the Docker container.

---

### 2. Run Migrations

```bash
npx db-migrate up
```

This applies migrations to the development database.

---

## Running the Application

### Start Development Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:3001
```

The backend connects to the **development database (shoppes)**.

---

## Testing

Run tests with:

```bash
npm run test
```

Tests run against the **shoppes_test** database.
---

## Project Workflow

1. Clone repository
2. Install dependencies
3. Create `.env` file
4. Start PostgreSQL (`docker-compose up -d`)
5. Create databases if needed
6. Run migrations (`npx db-migrate up`)
7. Start server (`npm run dev`)
8. Run tests (`npm run test`)

---

## Important Notes

* Passwords are hashed using bcrypt before storage.
* JWT is required for protected routes.
* Environment variables control database connections.
* Development and test environments use separate databases.

---

## Ports

* Backend: `3001`
* PostgreSQL: `5432`

---

## Status

- CRUD API implemented
- PostgreSQL integration complete
- JWT authentication implemented
- Database migrations configured
- Jasmine testing suite added
