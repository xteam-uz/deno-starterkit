# Deployment Guide

## Local development

```sh
docker compose up --build
```

## Production

Build the production stage from the Dockerfile, provide validated environment variables, run migrations before rollout, and expose only the API port through a reverse proxy or load balancer.

## Runtime security

- Run as the non-root `deno` user.
- Use least-privilege Deno permissions.
- Keep secrets in a managed secret store.
- Enable HTTPS at the edge.
- Use Redis-backed rate limiting and centralized logs in multi-instance deployments.
