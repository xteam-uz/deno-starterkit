# Architecture Guide

## Architecture review

The repository originally contained only a README, so there were no runtime boundaries, no dependency management, no security posture, no tests, no CI, and no deployment model. The new structure introduces a Deno v2, strict TypeScript, ESM-only backend foundation.

## Framework decision

### Oak

Oak is mature in the Deno ecosystem and familiar to Koa users. It is a solid choice for classic middleware-heavy APIs, but it carries a larger abstraction surface and is less portable across runtimes.

### Hono

Hono was selected for backend APIs because it is small, fast, standards-oriented, works well with Deno and JSR, and keeps handlers close to Web API primitives. Its tradeoff is that teams must define more architectural conventions themselves, which this starter kit does through Clean Architecture modules and provider interfaces.

### Fresh server mode

Fresh is excellent for server-rendered web applications and islands architecture. For API-first SaaS, microservices, and internal tools, it adds frontend-oriented concepts that are not needed for a pure backend starter kit.

## Chosen stack

- Runtime: Deno 2.8.2.
- HTTP: Hono for fast Fetch API-compatible routing.
- Database: PostgreSQL with Drizzle ORM.
- Validation: Zod.
- Auth: JWT access/refresh tokens and Argon2 password hashing.

## Folder responsibilities

- `src/app`: composition root, dependency injection, and router assembly.
- `src/bootstrap`: process startup and server lifecycle.
- `src/config`: validated environment and typed configuration.
- `src/database`: schema, migrations, seeders, repository support, and transactions.
- `src/modules`: feature modules organized by domain and Clean Architecture layers.
- `src/shared`: framework-agnostic constants, errors, interfaces, validators, types, and helpers.
- `src/middleware`: HTTP middleware for security, context, auth, errors, CORS, and rate limiting.
- `src/infrastructure`: concrete adapters for cache, email, HTTP, security, observability, and other technical concerns.
- `src/services`: cross-cutting application services that do not belong to one module.
- `src/integrations`: third-party API anti-corruption layers.
- `src/jobs`: background and scheduled job definitions.
- `src/queues`: queue provider abstractions.
- `src/events`: event bus and domain event primitives.
- `src/storage`: storage abstractions for local and S3-compatible providers.
- `src/docs`: generated API documentation source.
- `src/tests`: unit, integration, e2e, factories, and test support.

## Dependency inversion

Business logic depends on interfaces such as `UserRepository`, `PasswordHasher`, `TokenService`, `CacheProvider`, `QueueProvider`, `StorageProvider`, and `EmailProvider`. Concrete adapters can be replaced without rewriting use cases.
