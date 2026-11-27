import type { ParseRouteSegment } from "../parse-route";
import type { MatchRouteParameters } from "./types";

import { constants } from "./constants";

export function compareSegments(
  a: ParseRouteSegment[],
  b: ParseRouteSegment[],
): number {
  const [firstA, ...restA] = a;
  const [firstB, ...restB] = b;

  if (firstA === undefined || firstB === undefined) return a.length - b.length;

  const difference =
    constants.priorities.indexOf(firstA.type) -
    constants.priorities.indexOf(firstB.type);

  return difference === 0 ? compareSegments(restA, restB) : difference;
}

export function matchSegments(
  pathSegments: string[],
  routeSegments: ParseRouteSegment[],
): MatchRouteParameters | null {
  const [pathSegment, ...restPathSegments] = pathSegments;
  const [routeSegment, ...restRouteSegments] = routeSegments;

  if (routeSegment === undefined) return pathSegment === undefined ? {} : null;

  if (routeSegment.type === "optional-catch-all")
    return pathSegment === undefined
      ? {}
      : { [routeSegment.name]: pathSegments };

  if (routeSegment.type === "catch-all")
    return pathSegment === undefined
      ? null
      : { [routeSegment.name]: pathSegments };

  if (pathSegment === undefined) return null;

  if (routeSegment.type === "static")
    return routeSegment.name === pathSegment
      ? matchSegments(restPathSegments, restRouteSegments)
      : null;

  const parameters = matchSegments(restPathSegments, restRouteSegments);

  return parameters === null
    ? null
    : { ...parameters, [routeSegment.name]: pathSegment };
}
