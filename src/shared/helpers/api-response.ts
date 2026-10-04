import type { ApiError, ApiSuccess } from "../types/api.ts";

export function ok<T>(data: T, requestId: string, meta?: Record<string, unknown>): ApiSuccess<T> {
  return { success: true, data, meta, requestId };
}

export function fail(code: string, message: string, requestId: string, details?: unknown): ApiError {
  return { success: false, error: { code, message, details }, requestId };
}
