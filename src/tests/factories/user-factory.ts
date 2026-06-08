import type { User } from "../../modules/users/domain/user.ts";

export function userFactory(overrides: Partial<User> = {}): User {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    email: "user@example.com",
    name: "Test User",
    passwordHash: "$argon2id$salt$hash",
    permissions: [],
    roles: ["user"],
    isActive: true,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}
