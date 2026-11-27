export type ParseRouteSegment = {
  name: string;
  type: "catch-all" | "dynamic" | "optional-catch-all" | "static";
};

export type ParseRouteInput = {
  route: string;
};

export type ParseRouteOutput = {
  segments: ParseRouteSegment[];
};
