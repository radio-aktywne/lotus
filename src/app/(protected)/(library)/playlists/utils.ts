import { parseQueryParams } from "../../../../lib/urls/parse-query-params";
import { searchParamsSchema } from "./schemas";
import { PlaylistListPageSearchParams } from "./types";

export function parseParams(params: PlaylistListPageSearchParams) {
  return parseQueryParams({
    params: new URLSearchParams(params),
    schema: searchParamsSchema,
  });
}
