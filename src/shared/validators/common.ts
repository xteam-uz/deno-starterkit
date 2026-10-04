import { z } from "zod";

export const uuidSchema = z.string().uuid();
export const emailSchema = z.string().email().max(255).transform((value) => value.toLowerCase());
export const passwordSchema = z.string().min(12).max(128);

export function sanitizeText(value: string): string {
  return value.trim().replace(/[<>]/g, "");
}
