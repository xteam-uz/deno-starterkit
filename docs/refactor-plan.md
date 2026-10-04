# Repository Refactor Plan

## Phase 1: Foundation

- Add Deno configuration, strict TypeScript, tasks, formatting, linting, and editor defaults.
- Create Clean Architecture folders and feature modules.
- Add Hono router, middleware, standard responses, and error handling.

## Phase 2: Domain and data

- Add PostgreSQL schema with Drizzle.
- Introduce migrations, seeders, soft deletes, audit fields, repositories, and transaction abstractions.
- Keep use cases dependent on repository interfaces.

## Phase 3: Security and identity

- Add Argon2 password hashing.
- Add JWT access/refresh tokens.
- Add RBAC primitives and permission middleware.
- Add security headers, CORS, rate limiting, request size limits, validation, sanitization, and secret validation.

## Phase 4: Operations and DX

- Add structured logs, health checks, Prometheus metrics, tracing context, OpenAPI, Docker, GitHub Actions, test factories, and documentation.

## File-by-file implementation plan

- `deno.json`: runtime, imports, strict compiler options, tasks, fmt, and lint settings.
- `src/app/*`: dependency composition and route assembly.
- `src/bootstrap/*`: server startup.
- `src/config/*`: typed environment and app configuration.
- `src/database/*`: Drizzle schema, SQL migrations, seeders, repository helpers, and transactions.
- `src/modules/auth/*`: auth use cases, password hashing, JWT, and HTTP routes.
- `src/modules/users/*`: user domain, repository contract, in-memory adapter, service, and routes.
- `src/modules/roles/*` and `src/modules/permissions/*`: RBAC domain primitives.
- `src/middleware/*`: HTTP boundary controls.
- `src/infrastructure/*`: cache, email, security, logging, metrics, and tracing adapters.
- `src/queues/*`, `src/events/*`, `src/jobs/*`, `src/storage/*`: pluggable async and storage foundations.
- `docs/*`: architecture, security, testing, deployment, OpenAPI, and roadmap documentation.
- `.github/workflows/ci.yml`: verification pipeline.
- `Dockerfile` and `docker-compose.yml`: dev and production container workflows.
