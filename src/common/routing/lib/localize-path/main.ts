import type { LocalizePathInput, LocalizePathOutput } from "./types";

import { fillRoute } from "../fill-route";
import { matchRoute } from "../match-route";

export function localizePath({
  localeRoutes,
  path,
}: LocalizePathInput): LocalizePathOutput {
  const { match } = matchRoute({
    path: path,
    routes: Object.keys(localeRoutes),
  });

  if (match === null) return { path: path };

  const { path: localizedPath } = fillRoute({
    parameters: match.parameters,
    route: localeRoutes[match.route]!,
  });

  return { path: localizedPath };
}
