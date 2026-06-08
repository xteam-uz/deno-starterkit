import { z } from "zod";

const EnvSchema = z.object({
  APP_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_NAME: z.string().default("deno-starterkit"),
  APP_PORT: z.coerce.number().int().positive().default(8000),
  APP_BASE_URL: z.string().url().default("http://localhost:8000"),
  DATABASE_URL: z.string().url().default("postgres://postgres:postgres@localhost:5432/deno_starterkit"),
  JWT_ACCESS_SECRET: z.string().min(32).default("development-access-secret-at-least-32-chars"),
  JWT_REFRESH_SECRET: z.string().min(32).default("development-refresh-secret-at-least-32-chars"),
  JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().positive().default(900),
  JWT_REFRESH_TTL_SECONDS: z.coerce.number().int().positive().default(2_592_000),
  CORS_ORIGINS: z.string().default("http://localhost:3000"),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  RATE_LIMIT_WINDOW_SECONDS: z.coerce.number().int().positive().default(60),
  REQUEST_BODY_LIMIT_BYTES: z.coerce.number().int().positive().default(1_048_576),
}).superRefine((value, context) => {
  if (value.APP_ENV === "production" && value.JWT_ACCESS_SECRET.startsWith("development-")) {
    context.addIssue({ code: "custom", path: ["JWT_ACCESS_SECRET"], message: "must be a production secret" });
  }
  if (value.APP_ENV === "production" && value.JWT_REFRESH_SECRET.startsWith("development-")) {
    context.addIssue({ code: "custom", path: ["JWT_REFRESH_SECRET"], message: "must be a production secret" });
  }
});

export type AppEnv = z.infer<typeof EnvSchema>;

export function loadEnv(input: Record<string, string | undefined> = Deno.env.toObject()): AppEnv {
  const parsed = EnvSchema.safeParse(input);
  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
    throw new Error(`Invalid environment configuration: ${details}`);
  }
  return parsed.data;
}

export function corsOrigins(env: AppEnv): string[] {
  return env.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean);
}
