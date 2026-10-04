import type { QueryOptions } from "../types/api.ts";

export function parseQuery(url: URL): QueryOptions {
  const page = Math.max(Number(url.searchParams.get("page") ?? 1), 1);
  const perPage = Math.min(Math.max(Number(url.searchParams.get("perPage") ?? 20), 1), 100);
  const filters: Record<string, string> = {};
  for (const [key, value] of url.searchParams.entries()) {
    if (key.startsWith("filter[")) filters[key.slice(7, -1)] = value;
  }
  return {
    page,
    perPage,
    sort: url.searchParams.get("sort") ?? undefined,
    direction: url.searchParams.get("direction") === "desc" ? "desc" : "asc",
    search: url.searchParams.get("search") ?? undefined,
    filters,
  };
}
