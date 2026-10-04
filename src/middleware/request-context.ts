import type { MiddlewareHandler } from "@hono/hono";
import { createTraceContext } from "../infrastructure/observability/tracing.ts";

type Variables = { requestId: string; correlationId: string; traceId: string };

export const requestContext: MiddlewareHandler<{ Variables: Variables }> = async (c, next) => {
  const requestId = c.req.header("x-request-id") ?? crypto.randomUUID();
  const correlationId = c.req.header("x-correlation-id") ?? requestId;
  const trace = createTraceContext();
  c.set("requestId", requestId);
  c.set("correlationId", correlationId);
  c.set("traceId", trace.traceId);
  c.header("x-request-id", requestId);
  c.header("x-correlation-id", correlationId);
  await next();
};
