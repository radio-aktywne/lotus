import { useMemo } from "react";

import type {
  UseLocalizedRoutesInput,
  UseLocalizedRoutesOutput,
} from "./types";

import { useSafeContext } from "../../../generic/hooks/use-safe-context";
import { RoutingContext } from "../../contexts/routing";

export function useLocalizedRoutes({}: UseLocalizedRoutesInput = {}): UseLocalizedRoutesOutput {
  const { localizedRoutes } = useSafeContext(RoutingContext);

  return useMemo(
    () => ({ localizedRoutes: localizedRoutes }),
    [localizedRoutes],
  );
}
