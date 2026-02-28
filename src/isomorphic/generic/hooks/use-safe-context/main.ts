import { useContext } from "react";

import type { UseSafeContextContext, UseSafeContextName } from "./types";

import { ContextUsageError } from "../../errors";

export function useSafeContext<T>(
  context: UseSafeContextContext<T>,
  name?: UseSafeContextName,
): T {
  const value = useContext(context);

  if (value === undefined)
    throw new ContextUsageError(name ?? context.displayName);

  return value;
}
