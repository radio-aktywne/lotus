import { createContext } from "react";

import type { IdentityContextValue } from "./types";

export const IdentityContext = createContext<IdentityContextValue | undefined>(
  undefined,
);
