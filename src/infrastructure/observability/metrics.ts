type CounterKey = string;

export class MetricsRegistry {
  private counters = new Map<CounterKey, number>();

  increment(name: string, labels: Record<string, string> = {}) {
    const key = this.key(name, labels);
    this.counters.set(key, (this.counters.get(key) ?? 0) + 1);
  }

  prometheus(): string {
    return [...this.counters.entries()].map(([key, value]) => `${key} ${value}`).join("\n") + "\n";
  }

  private key(name: string, labels: Record<string, string>) {
    const labelText = Object.entries(labels).map(([key, value]) => `${key}="${value}"`).join(",");
    return labelText ? `${name}{${labelText}}` : name;
  }
}

export const metrics = new MetricsRegistry();
