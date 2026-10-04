# Deno Starter Kit

A highly opinionated, extensible, production-oriented backend starter kit for Deno v2.8.2, strict TypeScript, and ESM-only applications.

## What you can build

- SaaS platforms
- REST APIs
- Admin panels
- Microservices
- Enterprise systems
- Internal tools
- Multi-tenant platforms

## Highlights

- Clean Architecture and feature-based modules
- Hono API runtime selected after evaluating Oak and Fresh server mode
- PostgreSQL and Drizzle ORM foundation
- Replaceable database, cache, queue, storage, and email providers
- JWT access and refresh token support
- Argon2 password hashing
- RBAC users, roles, and permissions model
- Security headers, CORS, rate limiting, request size limits, validation, sanitization, and secret validation
- Structured JSON logs, health/readiness/liveness checks, Prometheus metrics, and tracing context
- OpenAPI document generation
- Docker and GitHub Actions
- Unit, integration, e2e, factories, and coverage strategy

## Quick start

```sh
cp .env.example .env
docker compose up --build
```

Or with Deno installed:

```sh
deno task dev
```

## API examples

```sh
curl http://localhost:8000/health
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H 'content-type: application/json' \
  -d '{"email":"admin@example.com","name":"Admin","password":"ChangeMe12345!"}'
```

## Architecture

See [`docs/architecture.md`](docs/architecture.md) for the full architecture review, framework tradeoffs, folder responsibilities, and dependency decisions. See [`docs/improvement-report.md`](docs/improvement-report.md) and [`docs/refactor-plan.md`](docs/refactor-plan.md) for the repository audit and implementation plan.

## Security

See [`docs/security.md`](docs/security.md) for the security review, OWASP-aligned controls, CSRF strategy, and production hardening roadmap.

## Testing

See [`docs/testing.md`](docs/testing.md). The target is 90%+ coverage with fast unit tests, interface-level mocks, integration tests through `app.fetch`, and Docker-backed E2E tests. See [`docs/devops.md`](docs/devops.md) and [`docs/deployment.md`](docs/deployment.md) for CI/CD and runtime operations.

## Roadmap

### v1

- Stable HTTP API foundation
- PostgreSQL schema, migrations, and seeders
- Auth, JWT, RBAC, security middleware, OpenAPI, CI, and Docker

### v2

- Persistent refresh token rotation and reuse detection
- Redis cache/rate-limit/queue adapters
- OAuth2, Google, GitHub, and SSO adapters
- Multi-tenant module and admin panel starter

### v3

- OpenTelemetry exporter integrations
- S3/MinIO production storage adapter
- Advanced policy engine
- CLI generator for modules, migrations, and providers
