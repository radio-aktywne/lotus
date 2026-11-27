import { compact } from "es-toolkit/array";

import type { ParseRouteInput, ParseRouteOutput } from "./types";

import { parseSegment } from "./utils";

export function parseRoute({ route }: ParseRouteInput): ParseRouteOutput {
  const segments = compact(route.split("/")).map((segment) =>
    parseSegment(segment),
  );

  return { segments: segments };
}
