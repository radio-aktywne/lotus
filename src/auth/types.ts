import { NextAuthConfig, NextAuthResult } from "next-auth";

export type AccessTokenData = {
  expiresAt: number;
  expiresIn: number;
};

export type RefreshTokenData = {
  token: string;
};

export type IdTokenData = {
  issuer: string;
  sessionId: string;
  token: string;
};

export type TokensData = {
  access: AccessTokenData;
  id: IdTokenData;
  refresh: RefreshTokenData;
};

export type PublicUserData = {
  subject: string;
};

export type CustomUserData = {
  subject: string;
};

export type CustomTokenData = {
  tokens: TokensData;
  user: CustomUserData;
};

export type CustomSessionData = {
  user: PublicUserData;
};

export type TranformTokenInput = Parameters<
  NonNullable<NonNullable<NextAuthConfig["callbacks"]>["jwt"]>
>[0];

export type TransformSessionInput = Parameters<
  NonNullable<NonNullable<NextAuthConfig["callbacks"]>["session"]>
>[0];

export type Auth = NextAuthResult;
