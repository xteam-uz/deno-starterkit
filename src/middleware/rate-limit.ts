import type { MiddlewareHandler } from "@hono/hono";
import { AppError } from "../shared/errors/app-error.ts";

type Bucket = { count: number; resetAt: number };

export function rateLimit(max: number, windowSeconds: number): MiddlewareHandler {
  const buckets = new Map<string, Bucket>();
  return async (c, next) => {
    const key = c.req.header("x-forwarded-for") ?? "local";
    const now = Date.now();
    const current = buckets.get(key) ?? { count: 0, resetAt: now + windowSeconds * 1000 };
    if (now > current.resetAt) {
      current.count = 0;
      current.resetAt = now + windowSeconds * 1000;
    }
    current.count += 1;
    buckets.set(key, current);
    c.header("x-ratelimit-limit", String(max));
    c.header("x-ratelimit-remaining", String(Math.max(max - current.count, 0)));
    if (current.count > max) throw new AppError("RATE_LIMITED", "Too many requests", 429);
    await next();
  };
}
