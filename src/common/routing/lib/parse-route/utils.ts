import type { ParseRouteSegment } from "./types";

export function parseSegment(segment: string): ParseRouteSegment {
  const optionalCatchAll = /^\[\[\.\.\.(.+)\]\]$/.exec(segment);
  if (optionalCatchAll)
    return { name: optionalCatchAll[1]!, type: "optional-catch-all" };

  const catchAll = /^\[\.\.\.(.+)\]$/.exec(segment);
  if (catchAll) return { name: catchAll[1]!, type: "catch-all" };

  const dynamic = /^\[(.+)\]$/.exec(segment);
  if (dynamic) return { name: dynamic[1]!, type: "dynamic" };

  return { name: segment, type: "static" };
}
