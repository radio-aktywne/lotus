import { isEqual } from "es-toolkit/predicate";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import type { HistorySynchronizerInput } from "./types";

import { useGlobalState } from "../../../../../state/hooks/use-global-state";

export function HistorySynchronizer({}: HistorySynchronizerInput) {
  const { state } = useGlobalState();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const latestEntry = state.current.history.entries.at(-1);
    const newEntry = {
      path: pathname,
      query: searchParams.entries().reduce(
        (acc, [key, value]) => {
          if (acc[key] === undefined) acc[key] = value;
          else if (Array.isArray(acc[key])) acc[key].push(value);
          else acc[key] = [acc[key], value];

          return acc;
        },
        {} as { [key: string]: string | string[] },
      ),
    };

    if (!isEqual(newEntry, latestEntry))
      state.current.history.entries.push(newEntry);
  }, [pathname, searchParams, state.current.history.entries]);

  return null;
}
