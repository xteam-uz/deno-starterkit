import type { CreateUserInput, User } from "../domain/user.ts";
import type { UserRepository } from "../domain/user-repository.ts";

export class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return [...this.users.values()].find((user) => user.email === email && !user.deletedAt) ?? null;
  }

  async create(input: CreateUserInput): Promise<User> {
    const now = new Date();
    const user: User = {
      id: crypto.randomUUID(),
      email: input.email,
      name: input.name,
      passwordHash: input.passwordHash,
      permissions: [],
      roles: ["user"],
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(user.id, user);
    return user;
  }

  async list(): Promise<User[]> {
    return [...this.users.values()].filter((user) => !user.deletedAt);
  }
}
