import type { MiddlewareHandler } from "@hono/hono";
import { AppError } from "../shared/errors/app-error.ts";

export function requestSizeLimit(maxBytes: number): MiddlewareHandler {
  return async (c, next) => {
    const length = Number(c.req.header("content-length") ?? 0);
    if (length > maxBytes) throw new AppError("PAYLOAD_TOO_LARGE", "Request body is too large", 413);
    await next();
  };
}
