export interface CacheProvider {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
}

export class MemoryCacheProvider implements CacheProvider {
  private items = new Map<string, { value: unknown; expiresAt?: number }>();
  async get<T>(key: string): Promise<T | null> {
    const item = this.items.get(key);
    if (!item) return null;
    if (item.expiresAt && item.expiresAt < Date.now()) {
      this.items.delete(key);
      return null;
    }
    return item.value as T;
  }
  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    this.items.set(key, { value, expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined });
  }
  async delete(key: string): Promise<void> { this.items.delete(key); }
}
