import { NextAuthConfig, NextAuthResult } from "next-auth";

export type ProfileData = {
  iss: string;
  sid: string;
  sub: string;
};

export type CustomUserData = {
  issuer: string;
  sessionId: string;
  subject: string;
};

export type AccessTokenData = {
  expiresAt: number;
  expiresIn: number;
  token: string;
};

export type RefreshTokenData = {
  token: string;
};

export type IdTokenData = {
  token: string;
};

export type TokensData = {
  access: AccessTokenData;
  id: IdTokenData;
  refresh: RefreshTokenData;
};

export type CustomTokenData = {
  tokens: TokensData;
  user: CustomUserData;
};

export type CustomSessionData = {
  tokens: Pick<TokensData, "id">;
  user: CustomUserData;
};

export type TranformTokenInput = Parameters<
  NonNullable<NonNullable<NextAuthConfig["callbacks"]>["jwt"]>
>[0];

export type TransformSessionInput = Parameters<
  NonNullable<NonNullable<NextAuthConfig["callbacks"]>["session"]>
>[0];

export type Auth = NextAuthResult;
