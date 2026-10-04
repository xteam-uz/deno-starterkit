import { AuthService } from "../modules/auth/application/auth-service.ts";
import { Argon2PasswordHasher } from "../modules/auth/infrastructure/argon2-password-hasher.ts";
import { JwtTokenService } from "../modules/auth/infrastructure/jwt-token-service.ts";
import { InMemoryUserRepository } from "../modules/users/infrastructure/in-memory-user-repository.ts";
import { UserService } from "../modules/users/application/user-service.ts";
import { MemoryCacheProvider } from "../infrastructure/cache/cache-provider.ts";
import { ConsoleEmailProvider } from "../infrastructure/email/email-provider.ts";
import { MemoryQueueProvider } from "../queues/queue-provider.ts";
import { EventBus } from "../events/event-bus.ts";

export function createContainer() {
  const userRepository = new InMemoryUserRepository();
  const passwordHasher = new Argon2PasswordHasher();
  const tokenService = new JwtTokenService();
  return {
    userRepository,
    passwordHasher,
    tokenService,
    authService: new AuthService(userRepository, passwordHasher, tokenService),
    userService: new UserService(userRepository),
    cache: new MemoryCacheProvider(),
    email: new ConsoleEmailProvider(),
    queue: new MemoryQueueProvider(),
    events: new EventBus(),
  };
}
