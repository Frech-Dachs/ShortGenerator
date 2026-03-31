# Database Service

This folder is intentionally scaffold-only and assumes PostgreSQL.

## Ready For

- init SQL scripts in `init/`
- migration tooling in `migrations/`
- local dump files in `backups/`
- Docker-based local database startup

## Expected Next Step

1. Copy `env/postgres.env.example` to `env/postgres.env`.
2. Add your initialization or migration setup.
3. Start the service with the `database` compose profile.
