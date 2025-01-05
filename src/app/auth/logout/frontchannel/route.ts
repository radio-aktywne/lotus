import { NextRequest, NextResponse } from "next/server";

import { checkSession, parseParams, signOut } from "./utils";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { data: params, error: paramsError } = parseParams(request);

  if (!paramsError) {
    const { iss, sid } = params;

    if (await checkSession(iss, sid)) {
      await signOut();
    }
  }

  return new NextResponse("");
}
