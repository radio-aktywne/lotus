import { getToken as internalGetToken } from "next-auth/jwt";
import { headers } from "next/headers";
import "server-only";

import { authConfig } from "../../../auth";
import { GetTokenInput, GetTokenOutput } from "./types";

export async function getToken({}: GetTokenInput = {}): Promise<GetTokenOutput> {
  const token = await internalGetToken({
    cookieName: authConfig.cookies.sessionToken.name,
    req: { headers: headers() },
    secret: authConfig.secret,
  });

  return { token: token };
}
