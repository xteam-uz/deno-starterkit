# syntax=docker/dockerfile:1.7
FROM denoland/deno:2.8.2 AS deps
WORKDIR /app
COPY deno.json deno.lock* ./
RUN deno cache --lock-write src/main.ts || true

FROM denoland/deno:2.8.2 AS development
WORKDIR /app
ENV DENO_ENV=development
COPY . .
EXPOSE 8000
CMD ["task", "dev"]

FROM denoland/deno:2.8.2 AS production
WORKDIR /app
ENV APP_ENV=production
COPY deno.json deno.lock* ./
COPY src ./src
COPY docs ./docs
RUN deno cache src/main.ts
USER deno
EXPOSE 8000
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "src/main.ts"]
