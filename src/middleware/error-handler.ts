import type { ErrorHandler } from "@hono/hono";
import { logger } from "../infrastructure/observability/logger.ts";
import { fail } from "../shared/helpers/api-response.ts";
import { AppError } from "../shared/errors/app-error.ts";

export const errorHandler: ErrorHandler = (error, c) => {
  const requestId = c.req.header("x-request-id") ?? "unknown";
  if (error instanceof AppError) {
    logger.warn(error.message, { requestId, code: error.code, status: error.status });
    return c.json(fail(error.code, error.message, requestId, error.details), error.status);
  }
  logger.error(error.message, { requestId, stack: error.stack });
  return c.json(fail("INTERNAL_SERVER_ERROR", "An unexpected error occurred", requestId), 500);
};
