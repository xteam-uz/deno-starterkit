import { hash as argon2Hash } from "argon2";
import type { PasswordHasher } from "../domain/password-hasher.ts";

const encoder = new TextEncoder();

function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index++) diff |= a[index] ^ b[index];
  return diff === 0;
}

export class Argon2PasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const digest = argon2Hash(encoder.encode(password), salt);
    return `$argon2id$${toBase64(salt)}$${toBase64(digest)}`;
  }

  async verify(password: string, encodedHash: string): Promise<boolean> {
    const [, algorithm, salt, expected] = encodedHash.split("$");
    if (algorithm !== "argon2id" || !salt || !expected) return false;
    const actual = argon2Hash(encoder.encode(password), fromBase64(salt));
    return constantTimeEqual(actual, fromBase64(expected));
  }
}
