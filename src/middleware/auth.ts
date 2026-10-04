import type { MiddlewareHandler } from "@hono/hono";
import { ForbiddenError, UnauthorizedError } from "../shared/errors/app-error.ts";
import type { TokenService, TokenSubject } from "../modules/auth/domain/token-service.ts";

type Variables = { auth: TokenSubject };

export function authenticate(tokens: TokenService): MiddlewareHandler<{ Variables: Variables }> {
  return async (c, next) => {
    const header = c.req.header("authorization");
    if (!header?.startsWith("Bearer ")) throw new UnauthorizedError();
    c.set("auth", await tokens.verifyAccess(header.slice("Bearer ".length)));
    await next();
  };
}

export function requirePermission(permission: string): MiddlewareHandler<{ Variables: Variables }> {
  return async (c, next) => {
    const auth = c.get("auth");
    if (!auth.permissions.includes(permission)) throw new ForbiddenError(`Missing permission: ${permission}`);
    await next();
  };
}
