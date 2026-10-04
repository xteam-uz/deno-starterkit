import type { MiddlewareHandler } from "@hono/hono";

export const securityHeaders: MiddlewareHandler = async (c, next) => {
  c.header("x-content-type-options", "nosniff");
  c.header("x-frame-options", "DENY");
  c.header("referrer-policy", "no-referrer");
  c.header("permissions-policy", "geolocation=(), microphone=(), camera=()");
  c.header("cross-origin-opener-policy", "same-origin");
  c.header("cross-origin-resource-policy", "same-origin");
  c.header("content-security-policy", "default-src 'none'; frame-ancestors 'none'");
  await next();
};
