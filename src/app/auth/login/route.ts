import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { createAuthorizationParams, parseParams, signIn } from "./utils";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { data: queryParams, error: paramsError } = parseParams(request);

  if (paramsError) redirect(`/auth/error`);

  const { callbackUrl, error: authError, prompt } = queryParams;

  if (!callbackUrl && authError) redirect(`/auth/error?error=${authError}`);

  const authorizationParams = await createAuthorizationParams(prompt);

  return await signIn(callbackUrl, authorizationParams);
}
