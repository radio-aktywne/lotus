import { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

import dayjs from "../dayjs";
import {
  refreshTokens as internalRefreshTokens,
  InvalidTokenError,
} from "../lib/scorpion/refresh-tokens";
import { refreshDurationFactor } from "./constants";
import { TokensData, TranformTokenInput, TransformSessionInput } from "./types";

export function splitSecrets(secrets: string) {
  return secrets.split(",");
}

export function getDurationInSeconds(duration: string) {
  return dayjs.duration(duration).asSeconds();
}

export function transformProfile(profile: Profile) {
  return {
    custom: {
      issuer: profile.iss,
      sessionId: profile.sid,
      subject: profile.sub,
    },
  } satisfies User;
}

function shouldRefreshTokens(token: JWT) {
  const now = dayjs.utc().unix();
  const expiration = token.custom.tokens.access.expiresAt;
  const duration = token.custom.tokens.access.expiresIn;

  return now > expiration - refreshDurationFactor * duration;
}

async function refreshTokens(token: JWT) {
  const now = dayjs.utc().unix();

  try {
    const { accessToken, expiresIn, refreshToken } =
      await internalRefreshTokens({
        refreshToken: token.custom.tokens.refresh.token,
      });

    const expiresAt = now + expiresIn;

    return {
      access: {
        expiresAt: expiresAt,
        expiresIn: expiresIn,
        token: accessToken,
      },
      id: token.custom.tokens.id,
      refresh: {
        token: refreshToken,
      },
    } satisfies TokensData;
  } catch (error) {
    if (error instanceof InvalidTokenError) throw error;
    return null;
  }
}

function createNewToken(account: Account, token: Partial<JWT>, user: User) {
  return {
    ...token,
    custom: {
      tokens: {
        access: {
          expiresAt: account.expires_at!,
          expiresIn: account.expires_in!,
          token: account.access_token!,
        },
        id: {
          token: account.id_token!,
        },
        refresh: {
          token: account.refresh_token!,
        },
      },
      user: user.custom,
    },
  } satisfies JWT;
}

export async function transformToken({
  account,
  token,
  trigger,
  user,
}: TranformTokenInput) {
  if (trigger === "signIn") return createNewToken(account!, token, user);

  if (shouldRefreshTokens(token)) {
    const tokens = await refreshTokens(token);
    if (tokens) token.custom.tokens = tokens;
  }

  return token;
}

export function transformSession({ session, token }: TransformSessionInput) {
  return {
    ...session,
    custom: {
      tokens: {
        id: token.custom.tokens.id,
      },
      user: token.custom.user,
    },
  } satisfies Session;
}
