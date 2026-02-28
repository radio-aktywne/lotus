"use client";

import type { HydratedInput } from "./types";

import { useHydrated } from "../../hooks/use-hydrated";

export function Hydrated({ children, fallback }: HydratedInput) {
  const { hydrated } = useHydrated();

  return hydrated ? children : fallback;
}
