import { AppError, UnauthorizedError } from "../../../shared/errors/app-error.ts";
import { sanitizeText } from "../../../shared/validators/common.ts";
import type { UserRepository } from "../../users/domain/user-repository.ts";
import type { PasswordHasher } from "../domain/password-hasher.ts";
import type { TokenService } from "../domain/token-service.ts";

export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly passwords: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async register(input: { email: string; name: string; password: string }) {
    const email = input.email.toLowerCase().trim();
    if (await this.users.findByEmail(email)) throw new AppError("EMAIL_TAKEN", "Email is already registered", 409);
    const user = await this.users.create({
      email,
      name: sanitizeText(input.name),
      passwordHash: await this.passwords.hash(input.password),
    });
    const tokenPair = await this.tokens.issue(user);
    return { user: this.publicUser(user), tokens: tokenPair };
  }

  async login(input: { email: string; password: string }) {
    const user = await this.users.findByEmail(input.email.toLowerCase().trim());
    if (!user || !user.isActive || !await this.passwords.verify(input.password, user.passwordHash)) {
      throw new UnauthorizedError("Invalid credentials");
    }
    return { user: this.publicUser(user), tokens: await this.tokens.issue(user) };
  }

  private publicUser(user: { id: string; email: string; name: string; roles: string[]; permissions: string[] }) {
    return { id: user.id, email: user.email, name: user.name, roles: user.roles, permissions: user.permissions };
  }
}
