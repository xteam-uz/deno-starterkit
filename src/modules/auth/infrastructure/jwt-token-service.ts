import { jwtVerify, SignJWT } from "jose";
import { env } from "../../../config/app.config.ts";
import type { TokenPair, TokenService, TokenSubject } from "../domain/token-service.ts";

const encoder = new TextEncoder();

export class JwtTokenService implements TokenService {
  private accessKey = encoder.encode(env.JWT_ACCESS_SECRET);
  private refreshKey = encoder.encode(env.JWT_REFRESH_SECRET);

  async issue(subject: TokenSubject): Promise<TokenPair> {
    const familyId = crypto.randomUUID();
    const accessToken = await new SignJWT({ permissions: subject.permissions, roles: subject.roles })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(subject.userId)
      .setJti(crypto.randomUUID())
      .setIssuedAt()
      .setExpirationTime(`${env.JWT_ACCESS_TTL_SECONDS}s`)
      .sign(this.accessKey);
    const refreshToken = await new SignJWT({ familyId })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(subject.userId)
      .setJti(crypto.randomUUID())
      .setIssuedAt()
      .setExpirationTime(`${env.JWT_REFRESH_TTL_SECONDS}s`)
      .sign(this.refreshKey);
    return { accessToken, refreshToken, expiresIn: env.JWT_ACCESS_TTL_SECONDS };
  }

  async verifyAccess(token: string): Promise<TokenSubject> {
    const { payload } = await jwtVerify(token, this.accessKey);
    return {
      userId: String(payload.sub),
      permissions: Array.isArray(payload.permissions) ? payload.permissions.map(String) : [],
      roles: Array.isArray(payload.roles) ? payload.roles.map(String) : [],
    };
  }
}
