export interface JwtPayload {
  sub: number;
  phone: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}