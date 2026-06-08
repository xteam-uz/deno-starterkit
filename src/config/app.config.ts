import { corsOrigins, loadEnv } from "./env.ts";

export const env = loadEnv();

export const appConfig = {
  name: env.APP_NAME,
  env: env.APP_ENV,
  port: env.APP_PORT,
  baseUrl: env.APP_BASE_URL,
  corsOrigins: corsOrigins(env),
  security: {
    rateLimitMax: env.RATE_LIMIT_MAX,
    rateLimitWindowSeconds: env.RATE_LIMIT_WINDOW_SECONDS,
    requestBodyLimitBytes: env.REQUEST_BODY_LIMIT_BYTES,
  },
  auth: {
    accessTtlSeconds: env.JWT_ACCESS_TTL_SECONDS,
    refreshTtlSeconds: env.JWT_REFRESH_TTL_SECONDS,
  },
} as const;
