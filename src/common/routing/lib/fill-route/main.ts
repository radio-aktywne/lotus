import type { FillRouteInput, FillRouteOutput } from "./types";

import { parseRoute } from "../parse-route";

export function fillRoute({
  parameters,
  route,
}: FillRouteInput): FillRouteOutput {
  const { segments } = parseRoute({ route: route });

  const pathSegments = segments.flatMap((segment) =>
    segment.type === "static" ? segment.name : (parameters[segment.name] ?? []),
  );

  return { path: `/${pathSegments.join("/")}` };
}
