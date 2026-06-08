export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type TokenSubject = {
  userId: string;
  permissions: string[];
  roles: string[];
};

export interface TokenService {
  issue(subject: TokenSubject): Promise<TokenPair>;
  verifyAccess(token: string): Promise<TokenSubject>;
}
