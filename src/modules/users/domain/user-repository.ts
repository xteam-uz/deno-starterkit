import type { CreateUserInput, User } from "./user.ts";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
  list(): Promise<User[]>;
}
