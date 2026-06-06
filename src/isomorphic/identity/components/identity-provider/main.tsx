"use client";

import { useState } from "react";

import type { IdentityProviderInput } from "./types";

import { IdentityContext } from "../../contexts/identity";
import { UserSynchronizer } from "./components/user-synchronizer";
import { createInitialIdentityContextValue } from "./utils";

export function IdentityProvider({ children, user }: IdentityProviderInput) {
  const [value] = useState(() => createInitialIdentityContextValue(user));

  return (
    <IdentityContext.Provider value={value}>
      <UserSynchronizer />
      {children}
    </IdentityContext.Provider>
  );
}
