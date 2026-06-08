import { assertEquals } from "@std/assert";
import { parseQuery } from "../../shared/helpers/query.ts";

Deno.test("parseQuery normalizes pagination and filters", () => {
  const query = parseQuery(new URL("http://localhost/users?page=2&perPage=500&filter[email]=a&direction=desc"));
  assertEquals(query.page, 2);
  assertEquals(query.perPage, 100);
  assertEquals(query.filters.email, "a");
  assertEquals(query.direction, "desc");
});
