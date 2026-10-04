# Contributing

Thank you for helping improve this Deno starter kit.

## Standards

- Use Deno v2.8.2.
- Keep TypeScript strict and ESM-only.
- Follow Conventional Commits.
- Prefer feature modules and dependency inversion.
- Do not introduce framework-specific logic into domain/application layers.

## Checks

Run:

```sh
deno fmt --check
deno lint
deno check src/main.ts src/tests/**/*.ts
deno test --coverage=coverage --allow-env --allow-read --allow-net=127.0.0.1,localhost
```
