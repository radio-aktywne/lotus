import { compact } from "es-toolkit/array";

import type {
  MatchRouteInput,
  MatchRouteMatch,
  MatchRouteOutput,
} from "./types";

import { parseRoute } from "../parse-route";
import { compareSegments, matchSegments } from "./utils";

export function matchRoute({
  path,
  routes,
}: MatchRouteInput): MatchRouteOutput {
  const pathSegments = compact(path.split("/"));

  const match = routes
    .map((route) => ({
      route: route,
      segments: parseRoute({ route: route }).segments,
    }))
    .sort((a, b) => compareSegments(a.segments, b.segments))
    .map(({ route, segments }) => ({
      parameters: matchSegments(pathSegments, segments),
      route: route,
    }))
    .find(
      (candidate): candidate is MatchRouteMatch =>
        candidate.parameters !== null,
    );

  return { match: match ?? null };
}
