import { Hono } from "@hono/hono";
import { ok } from "../../../shared/helpers/api-response.ts";
import type { UserService } from "../application/user-service.ts";

type Variables = { requestId: string };

export function createUserRoutes(userService: UserService): Hono<{ Variables: Variables }> {
  const app = new Hono<{ Variables: Variables }>();
  app.get("/", async (c) => {
    const users = await userService.listUsers();
    return c.json(ok(users.map(({ passwordHash: _passwordHash, ...user }) => user), c.get("requestId")));
  });
  return app;
}
