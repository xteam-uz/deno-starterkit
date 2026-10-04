import { Hono } from "@hono/hono";
import { appConfig } from "../config/app.config.ts";
import { metrics } from "../infrastructure/observability/metrics.ts";
import { createAuthRoutes } from "../modules/auth/presentation/auth-routes.ts";
import { createUserRoutes } from "../modules/users/presentation/user-routes.ts";
import { cors } from "../middleware/cors.ts";
import { errorHandler } from "../middleware/error-handler.ts";
import { rateLimit } from "../middleware/rate-limit.ts";
import { requestSizeLimit } from "../middleware/body-limit.ts";
import { requestContext } from "../middleware/request-context.ts";
import { securityHeaders } from "../middleware/security.ts";
import { ok } from "../shared/helpers/api-response.ts";
import { openApiDocument } from "../docs/openapi.ts";
import type { createContainer } from "./container.ts";

type Container = ReturnType<typeof createContainer>;
type Variables = { requestId: string; correlationId: string; traceId: string };

export function createApp(container: Container) {
  const app = new Hono<{ Variables: Variables }>();
  app.onError(errorHandler);
  app.use("*", requestContext);
  app.use("*", securityHeaders);
  app.use("*", cors(appConfig.corsOrigins));
  app.use("*", requestSizeLimit(appConfig.security.requestBodyLimitBytes));
  app.use("*", rateLimit(appConfig.security.rateLimitMax, appConfig.security.rateLimitWindowSeconds));
  app.use("*", async (c, next) => {
    await next();
    metrics.increment("http_requests_total", { method: c.req.method, path: new URL(c.req.url).pathname, status: String(c.res.status) });
  });

  app.get("/health", (c) => c.json(ok({ status: "ok", service: appConfig.name }, c.get("requestId"))));
  app.get("/health/live", (c) => c.json(ok({ status: "alive" }, c.get("requestId"))));
  app.get("/health/ready", (c) => c.json(ok({ status: "ready" }, c.get("requestId"))));
  app.get("/metrics", (c) => c.text(metrics.prometheus()));
  app.get("/openapi.json", (c) => c.json(openApiDocument));
  app.route("/api/v1/auth", createAuthRoutes(container.authService));
  app.route("/api/v1/users", createUserRoutes(container.userService));
  return app;
}
