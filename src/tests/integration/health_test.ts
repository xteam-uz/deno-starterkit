import { assertEquals } from "@std/assert";
import { createApp } from "../../app/router.ts";
import { createContainer } from "../../app/container.ts";

Deno.test("GET /health returns standard response", async () => {
  const app = createApp(createContainer());
  const response = await app.request("/health");
  const body = await response.json();
  assertEquals(response.status, 200);
  assertEquals(body.success, true);
  assertEquals(body.data.status, "ok");
});
