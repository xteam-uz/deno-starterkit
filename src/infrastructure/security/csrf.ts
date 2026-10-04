export function csrfStrategy(): string {
  return "For browser sessions, use SameSite=Lax/Strict secure cookies plus a double-submit CSRF token on unsafe methods. Bearer-token API clients are exempt when Authorization is used.";
}
