import postgres from "postgres";
import { env } from "../config/app.config.ts";

const sql = postgres(env.DATABASE_URL, { max: 1 });
for await (const entry of Deno.readDir(new URL("./migrations", import.meta.url))) {
  if (entry.isFile && entry.name.endsWith(".sql")) {
    const content = await Deno.readTextFile(new URL(`./migrations/${entry.name}`, import.meta.url));
    await sql.unsafe(content);
    console.log(JSON.stringify({ event: "migration.applied", file: entry.name }));
  }
}
await sql.end();
