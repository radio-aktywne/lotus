import type { MatchRouteParameters } from "../match-route";

export type FillRouteInput = {
  parameters: MatchRouteParameters;
  route: string;
};

export type FillRouteOutput = {
  path: string;
};
