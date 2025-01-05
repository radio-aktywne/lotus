import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { z } from "zod";

import { auth } from "../../../auth";
import { parseQueryParams } from "../../../lib/urls/parse-query-params";
import { searchParamsSchema } from "./schemas";

export function parseParams(request: NextRequest) {
  return parseQueryParams({
    params: request.nextUrl.searchParams,
    schema: searchParamsSchema,
  });
}

export async function createAuthorizationParams(
  prompt: z.infer<typeof searchParamsSchema>["prompt"],
) {
  const params = new URLSearchParams();

  const session = await auth.auth();

  if (session) {
    params.append("id_token_hint", session.custom.tokens.id.token);
  }

  switch (prompt) {
    case "account":
      params.append("prompt", "select_account");
      break;
    case "consent":
      params.append("prompt", "consent");
      break;
    case "login":
      params.append("prompt", "login");
      break;
    case "none":
      params.append("prompt", "none");
      break;
  }

  return params;
}

export async function signIn(
  callback: z.infer<typeof searchParamsSchema>["callbackUrl"],
  params: URLSearchParams,
) {
  try {
    return await auth.signIn(
      "scorpion",
      { redirectTo: callback ?? "/" },
      params,
    );
  } catch (error) {
    if (error instanceof AuthError) redirect(`/auth/error?error=${error.type}`);
    throw error;
  }
}
