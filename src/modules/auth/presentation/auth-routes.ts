import { Hono } from "@hono/hono";
import { z } from "zod";
import { ok } from "../../../shared/helpers/api-response.ts";
import { emailSchema, passwordSchema } from "../../../shared/validators/common.ts";
import { ValidationError } from "../../../shared/errors/app-error.ts";
import type { AuthService } from "../application/auth-service.ts";

type Variables = { requestId: string };

const registerSchema = z.object({ email: emailSchema, name: z.string().min(1).max(120), password: passwordSchema });
const loginSchema = z.object({ email: emailSchema, password: z.string().min(1) });

export function createAuthRoutes(authService: AuthService): Hono<{ Variables: Variables }> {
  const app = new Hono<{ Variables: Variables }>();
  app.post("/register", async (c) => {
    const parsed = registerSchema.safeParse(await c.req.json());
    if (!parsed.success) throw new ValidationError(parsed.error.flatten());
    return c.json(ok(await authService.register(parsed.data), c.get("requestId")), 201);
  });
  app.post("/login", async (c) => {
    const parsed = loginSchema.safeParse(await c.req.json());
    if (!parsed.success) throw new ValidationError(parsed.error.flatten());
    return c.json(ok(await authService.login(parsed.data), c.get("requestId")));
  });
  return app;
}
