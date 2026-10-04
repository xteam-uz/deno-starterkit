import postgres from "postgres";
import { Permissions } from "../shared/constants/permissions.ts";
import { env } from "../config/app.config.ts";

const sql = postgres(env.DATABASE_URL, { max: 1 });
for (const permission of Object.values(Permissions)) {
  await sql`INSERT INTO permissions (name, description) VALUES (${permission}, ${permission}) ON CONFLICT (name) DO NOTHING`;
}
await sql`INSERT INTO roles (name, description) VALUES ('admin', 'Platform administrator') ON CONFLICT (name) DO NOTHING`;
console.log(JSON.stringify({ event: "seed.completed" }));
await sql.end();
