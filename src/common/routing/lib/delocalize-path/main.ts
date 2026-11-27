import type { DelocalizePathInput, DelocalizePathOutput } from "./types";

import { fillRoute } from "../fill-route";
import { matchRoute } from "../match-route";

export function delocalizePath({
  localeRoutes,
  path,
}: DelocalizePathInput): DelocalizePathOutput {
  const { match } = matchRoute({
    path: path,
    routes: Object.values(localeRoutes),
  });

  if (match === null) return { path: null };

  const route = Object.keys(localeRoutes).find(
    (key) => localeRoutes[key] === match.route,
  )!;

  const { path: delocalizedPath } = fillRoute({
    parameters: match.parameters,
    route: route,
  });

  return { path: delocalizedPath };
}
