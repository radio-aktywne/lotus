"use client";

import { useMemo } from "react";

import type { RoutingProviderInput } from "./types";

import { RoutingContext } from "../../contexts/routing";
import { RoutingSynchronizer } from "./components/routing-synchronizer";

export function RoutingProvider({
  children,
  localizedRoutes,
}: RoutingProviderInput) {
  const value = useMemo(
    () => ({ localizedRoutes: localizedRoutes }),
    [localizedRoutes],
  );

  return (
    <RoutingContext.Provider value={value}>
      <RoutingSynchronizer />
      {children}
    </RoutingContext.Provider>
  );
}
