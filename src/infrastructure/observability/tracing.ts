export type TraceContext = { traceId: string; spanId: string };

export function createTraceContext(): TraceContext {
  return { traceId: crypto.randomUUID().replaceAll("-", ""), spanId: crypto.randomUUID().slice(0, 16) };
}
