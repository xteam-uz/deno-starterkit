import { appConfig } from "../config/app.config.ts";
import { logger } from "../infrastructure/observability/logger.ts";
import { createApp } from "../app/router.ts";
import { createContainer } from "../app/container.ts";

export function bootstrap() {
  const container = createContainer();
  const app = createApp(container);
  logger.info("server.start", { port: appConfig.port, env: appConfig.env });
  return Deno.serve({ port: appConfig.port }, app.fetch);
}
