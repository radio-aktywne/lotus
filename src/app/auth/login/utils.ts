import { NextRequest } from "next/server";

import { parseQueryParams } from "../../../lib/urls/parse-query-params";
import { searchParamsSchema } from "./schemas";

export function parseParams(request: NextRequest) {
  return parseQueryParams({
    params: request.nextUrl.searchParams,
    schema: searchParamsSchema,
  });
}
