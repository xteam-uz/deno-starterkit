import type { UserRepository } from "../domain/user-repository.ts";

export class UserService {
  constructor(private readonly users: UserRepository) {}

  async listUsers() {
    return await this.users.list();
  }
}
