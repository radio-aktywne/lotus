import { mapValues } from "es-toolkit/object";

import type { ResolvePathInput, ResolvePathOutput } from "./types";

import { commonRoutingConstants } from "../../constants";
import { delocalizePath } from "../delocalize-path";

export function resolvePath({
  locale,
  localizedRoutes,
  path,
}: ResolvePathInput): ResolvePathOutput {
  const internalRoutes = mapValues(
    commonRoutingConstants.routes,
    (message, route) => route,
  );

  const resolvedPath = [
    localizedRoutes[locale],
    ...Object.values(localizedRoutes),
    internalRoutes,
  ]
    .map(
      (localeRoutes) =>
        delocalizePath({ localeRoutes: localeRoutes, path: path }).path,
    )
    .find((delocalizedPath) => delocalizedPath !== null);

  return { path: resolvedPath ?? null };
}
