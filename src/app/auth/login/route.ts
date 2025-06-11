import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { logIn } from "../../../lib/auth/login";
import { parseParams } from "./utils";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { data: queryParams, error: paramsError } = parseParams(request);

  if (paramsError) redirect(`/auth/error`);

  const { callbackUrl, error: authError, prompt } = queryParams;

  if (!callbackUrl && authError) redirect(`/auth/error?error=${authError}`);

  const { error: loginError, url: redirectUrl } = await logIn({
    callback: callbackUrl ?? "/",
    prompt: prompt,
  });

  if (loginError !== undefined) redirect(`/auth/error?error=${loginError}`);

  redirect(redirectUrl);
}
