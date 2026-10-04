# Testing Strategy

- Unit tests validate pure helpers, services, and provider contracts.
- Integration tests exercise HTTP routes through Hono's `fetch` handler.
- E2E tests should run against Docker Compose with PostgreSQL and Redis.
- Factories live in `src/tests/factories` and generate valid domain objects.
- Coverage target is 90%+ for statements, branches, and critical auth/security paths.
- Mocking strategy: mock interfaces, not concrete adapters.
- Test database setup: run migrations against an isolated PostgreSQL database per CI job.
