import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../config/app.config.ts";
import * as schema from "./schema.ts";

export type Database = ReturnType<typeof createDatabase>;

export function createDatabase(databaseUrl = env.DATABASE_URL) {
  const client = postgres(databaseUrl, { max: 10, idle_timeout: 20, connect_timeout: 10 });
  return drizzle(client, { schema });
}
