import { createContext } from "react";

import type { RoutingContextValue } from "./types";

export const RoutingContext = createContext<RoutingContextValue | undefined>(
  undefined,
);
