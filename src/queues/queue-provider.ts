export type Job<T = unknown> = { id: string; name: string; payload: T; attempts: number };
export type JobHandler<T = unknown> = (job: Job<T>) => Promise<void>;

export interface QueueProvider {
  publish<T>(name: string, payload: T): Promise<Job<T>>;
  subscribe<T>(name: string, handler: JobHandler<T>): Promise<void>;
}

export class MemoryQueueProvider implements QueueProvider {
  private handlers = new Map<string, JobHandler[]>();
  async publish<T>(name: string, payload: T): Promise<Job<T>> {
    const job = { id: crypto.randomUUID(), name, payload, attempts: 0 };
    for (const handler of this.handlers.get(name) ?? []) await handler(job);
    return job;
  }
  async subscribe<T>(name: string, handler: JobHandler<T>): Promise<void> {
    const handlers = this.handlers.get(name) ?? [];
    handlers.push(handler as JobHandler);
    this.handlers.set(name, handlers);
  }
}
