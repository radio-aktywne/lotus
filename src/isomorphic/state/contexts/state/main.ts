import { createContext } from "react";

import type { State } from "../../types";

export const StateContext = createContext<State | undefined>(undefined);
