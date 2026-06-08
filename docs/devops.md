# DevOps Strategy

## CI

GitHub Actions runs formatting, linting, type checking, tests, coverage generation, OpenAPI generation verification, and dependency graph inspection with `deno info`.

## Containers

The Dockerfile has development and production targets based on `denoland/deno:2.8.2`. The production stage caches dependencies, copies only runtime files, exposes port 8000, and runs as the non-root `deno` user.

## Local dependencies

Docker Compose provides PostgreSQL and Redis. Redis is included for future cache, queue, and distributed rate-limit providers.

## Release discipline

Conventional Commits and Commitlint are configured, with a Husky commit-msg hook for local enforcement.
