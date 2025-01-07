import { NextRequest } from "next/server";

import { getToken } from "../../../../lib/auth/get-token";
import { parseQueryParams } from "../../../../lib/urls/parse-query-params";
import { searchParamsSchema } from "./schemas";

export function parseParams(request: NextRequest) {
  return parseQueryParams({
    params: request.nextUrl.searchParams,
    schema: searchParamsSchema,
  });
}

export async function checkSession(iss: string, sid: string) {
  const { token } = await getToken();

  return (
    token &&
    token.custom.tokens.id.issuer === iss &&
    token.custom.tokens.id.sessionId === sid
  );
}
