"use client";

import { useState } from "react";

import type { StateProviderInput } from "./types";

import { StateContext } from "../../contexts/state";
import { createInitialState } from "./utils";

export function StateProvider({ children }: StateProviderInput) {
  const [state] = useState(() => createInitialState());

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
}
