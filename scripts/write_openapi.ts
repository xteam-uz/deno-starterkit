import { openApiDocument } from "../src/docs/openapi.ts";
await Deno.writeTextFile("docs/openapi.json", JSON.stringify(openApiDocument, null, 2) + "\n");
