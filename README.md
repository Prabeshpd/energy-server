# energy-server

## Setup

- Requires Node 18 or above.

## Installation

Clone the repository, install the dependencies and get started right away. Make sure you already have `nodejs`, `npm` and `yarn` installed in your system.

```sh
git git@github.com:Prabeshpd/energy-server.git
cd energy-server
```

## Docker Compose

- ### Start Development Server

  ```bash
  cp .env.example .env

  make dev-start
  ```

  Make sure to update the .env variables.

  ```
  POSTGRES_DB_CONNECTION_URL = postgresql://postgres:Password@1234@localhost:5432/postgres
  ```

  Server will run at port 3001

  For Seeding

  ```bash
   yarn seed
  ```

- ### Test Application

  ```bash
  cp .env.example .env.test

  make test
  ```

  Make sure to update the .env.test variables.

  ```
  POSTGRES_DB_CONNECTION_URL = postgresql://postgres:Password@1234@localhost:5432/postgres_test
  ```

## Getting Started

### Development

1. Install all dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Seed Database

   ```bash

   yarn seed

   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Test

1. Test

   ```bash
   yarn test
   ```

## Deploy

    For Deploy application is hosted on Heroku. Database postgres is hosted in supabase.
