import { NextRequest } from "next/server";

import { auth } from "../../../../auth";
import { parseQueryParams } from "../../../../lib/urls/parse-query-params";
import { searchParamsSchema } from "./schemas";

export function parseParams(request: NextRequest) {
  return parseQueryParams({
    params: request.nextUrl.searchParams,
    schema: searchParamsSchema,
  });
}

export async function checkSession(iss: string, sid: string) {
  const session = await auth.auth();

  return (
    session &&
    session.custom.user.issuer === iss &&
    session.custom.user.sessionId === sid
  );
}

export async function signOut() {
  return auth.signOut({ redirect: false });
}
