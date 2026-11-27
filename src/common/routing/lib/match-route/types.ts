export type MatchRouteParameters = {
  [key: string]: string | string[];
};

export type MatchRouteMatch = {
  parameters: MatchRouteParameters;
  route: string;
};

export type MatchRouteInput = {
  path: string;
  routes: string[];
};

export type MatchRouteOutput = {
  match: MatchRouteMatch | null;
};
