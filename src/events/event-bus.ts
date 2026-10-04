export type DomainEvent<T = unknown> = { id: string; name: string; payload: T; occurredAt: Date };
export type EventHandler<T = unknown> = (event: DomainEvent<T>) => Promise<void>;

export class EventBus {
  private handlers = new Map<string, EventHandler[]>();
  on<T>(name: string, handler: EventHandler<T>) {
    const handlers = this.handlers.get(name) ?? [];
    handlers.push(handler as EventHandler);
    this.handlers.set(name, handlers);
  }
  async emit<T>(name: string, payload: T) {
    const event = { id: crypto.randomUUID(), name, payload, occurredAt: new Date() };
    for (const handler of this.handlers.get(name) ?? []) await handler(event);
  }
}
