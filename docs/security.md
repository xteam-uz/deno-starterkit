# Security Review

## Initial weaknesses

The initial repository had no application code and therefore no explicit controls for secrets, validation, authentication, authorization, logging, dependency review, or deployment hardening.

## Implemented controls

- Environment validation rejects short JWT secrets.
- Security headers reduce browser exploitation risk.
- CORS uses an allow-list.
- Request body size limits reduce resource exhaustion risk.
- Rate limiting provides brute-force and abuse protection foundation.
- Zod validation protects request boundaries.
- Sanitization is applied to user-controlled display text.
- JWT access and refresh token services support token rotation strategy through refresh token family IDs.
- RBAC primitives support middleware-based permission checks.
- Standard error contracts avoid leaking stack traces.
- Structured logs include request context.

## CSRF strategy

Bearer-token API clients are not subject to cookie CSRF. Browser session flows should use Secure, HttpOnly, SameSite cookies and double-submit CSRF tokens for unsafe methods.

## Remaining production hardening

- Persist refresh tokens and detect token family reuse.
- Add Redis-backed rate limiting for multi-instance deployments.
- Add dependency vulnerability scanning once Deno is available in CI.
- Add mTLS or private networking for internal services.
