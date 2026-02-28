import { useSyncExternalStore } from "react";

import type { UseHydratedInput, UseHydratedOutput } from "./types";

import { getServerSnapshot, getSnapshot, subscribe } from "./utils";

export function useHydrated({}: UseHydratedInput = {}): UseHydratedOutput {
  const hydrated = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return { hydrated: hydrated };
}
