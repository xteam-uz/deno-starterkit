import type { MiddlewareHandler } from "@hono/hono";

export function cors(allowedOrigins: string[]): MiddlewareHandler {
  return async (c, next) => {
    const origin = c.req.header("origin");
    if (origin && allowedOrigins.includes(origin)) {
      c.header("access-control-allow-origin", origin);
      c.header("vary", "Origin");
      c.header("access-control-allow-credentials", "true");
      c.header("access-control-allow-headers", "authorization,content-type,x-csrf-token,x-request-id,x-correlation-id");
      c.header("access-control-allow-methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    }
    if (c.req.method === "OPTIONS") return c.body(null, 204);
    await next();
  };
}
