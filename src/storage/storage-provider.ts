export type StoredObject = { key: string; contentType?: string; size: number };

export interface StorageProvider {
  put(key: string, body: Uint8Array, contentType?: string): Promise<StoredObject>;
  get(key: string): Promise<Uint8Array | null>;
  delete(key: string): Promise<void>;
}

export class LocalStorageProvider implements StorageProvider {
  constructor(private readonly root = ".storage") {}
  async put(key: string, body: Uint8Array, contentType?: string): Promise<StoredObject> {
    const path = `${this.root}/${key}`;
    await Deno.mkdir(path.split("/").slice(0, -1).join("/"), { recursive: true });
    await Deno.writeFile(path, body);
    return { key, contentType, size: body.byteLength };
  }
  async get(key: string): Promise<Uint8Array | null> {
    try { return await Deno.readFile(`${this.root}/${key}`); } catch { return null; }
  }
  async delete(key: string): Promise<void> { await Deno.remove(`${this.root}/${key}`).catch(() => undefined); }
}

export class S3CompatibleStorageProvider implements StorageProvider {
  async put(_key: string, _body: Uint8Array, _contentType?: string): Promise<StoredObject> {
    throw new Error("Configure AWS S3 or MinIO SDK adapter before use");
  }
  async get(_key: string): Promise<Uint8Array | null> { throw new Error("Configure AWS S3 or MinIO SDK adapter before use"); }
  async delete(_key: string): Promise<void> { throw new Error("Configure AWS S3 or MinIO SDK adapter before use"); }
}
