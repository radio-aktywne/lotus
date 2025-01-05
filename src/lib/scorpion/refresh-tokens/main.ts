import "server-only";

import { scorpion, scorpionCredentials } from "../../../services/scorpion";
import { ScorpionError } from "../errors";
import { InvalidInputError, InvalidTokenError } from "./errors";
import { RefreshTokensInput, RefreshTokensOutput } from "./types";

export async function refreshTokens({
  refreshToken,
}: RefreshTokensInput): Promise<RefreshTokensOutput> {
  const credentials = `${scorpionCredentials.client}:${scorpionCredentials.secret}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");

  const { data, error, response } = await scorpion.POST("/oauth2/token", {
    body: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    bodySerializer: (body) => new URLSearchParams(body),
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (error || !response.ok) {
    if (response.status === 400) {
      if (error?.error === "invalid_grant") throw new InvalidTokenError();
      throw new InvalidInputError();
    }

    throw new ScorpionError();
  }

  return {
    accessToken: data.access_token!,
    expiresIn: data.expires_in!,
    refreshToken: data.refresh_token!,
    scope: data.scope!,
    tokenType: data.token_type!,
  };
}
