import { parseQueryParams } from "../../../lib/urls/parse-query-params";
import { searchParamsSchema } from "./schemas";
import { AuthErrorPageSearchParams } from "./types";

export function parseParams(params: AuthErrorPageSearchParams) {
  return parseQueryParams({
    params: new URLSearchParams(params),
    schema: searchParamsSchema,
  });
}
