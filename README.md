# ShortGenerator Monorepo

The project is now split so you can start the FastAPI backend immediately without mixing it into the React app root.

## Structure

```text
frontend/   React + Vite + TypeScript + Tailwind app
backend/    FastAPI-ready service folder and Docker image
database/   PostgreSQL-ready service folder and Docker image
```

## Current Status

- `frontend/` contains the existing UI app.
- `backend/` contains only structure and container setup.
- `database/` contains only PostgreSQL structure and container setup.
- No backend code, routes, models, or database logic were added.

## Docker

### Frontend only

```bash
docker compose up --build frontend
```

Frontend runs at `http://localhost:5173`.

### Backend when you start implementing it

```bash
docker compose --profile backend build backend
docker compose --profile backend up backend
```

Backend is prepared to run on `http://localhost:8000` once you add `backend/app/main.py`.

### Database when you start implementing it

```bash
copy database\\env\\postgres.env.example database\\env\\postgres.env
docker compose --profile database build database
docker compose --profile database up database
```

PostgreSQL is prepared to run on `localhost:5432`.

## Notes

- The backend service is behind the `backend` compose profile so it does not start by default.
- The database service is behind the `database` compose profile so it does not start by default.
- The backend Docker image is ready, but the service will not run until you add actual FastAPI code.
- The database image is ready, but no schema, migration tooling, or seed SQL has been added yet.
- The frontend service remains runnable as before, now from the `frontend/` folder.
