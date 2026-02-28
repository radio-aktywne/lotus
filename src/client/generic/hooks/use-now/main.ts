import { useEffect, useMemo } from "react";

import type { UseNowInput, UseNowOutput } from "./types";

import { useGlobalState } from "../../../../isomorphic/state/hooks/use-global-state";
import { getNow } from "./utils";

export function useNow({}: UseNowInput = {}): UseNowOutput {
  const { state } = useGlobalState();

  useEffect(() => {
    if (state.current.now === undefined) {
      const now = getNow();

      const timer = window.setTimeout(
        function tick() {
          if (state.current.now === undefined) return;

          const now = getNow();
          state.current.now.timestamp = Math.floor(now / 1000);
          state.current.now.timer = window.setTimeout(
            tick,
            1000 - (now % 1000),
          );
        },
        1000 - (now % 1000),
      );

      state.current.now = {
        counter: 1,
        timer: timer,
        timestamp: Math.floor(now / 1000),
      };
    } else {
      state.current.now.counter += 1;
    }

    return () => {
      if (state.current.now === undefined) return;

      state.current.now.counter -= 1;

      if (state.current.now.counter > 0) return;

      window.clearTimeout(state.current.now.timer);
      state.current.now = undefined;
    };
  }, [state.current]);

  const fallback = useMemo(
    () => Math.floor(getNow() / 1000),
    [state.snapshot.now?.timestamp],
  );

  const timestamp = state.snapshot.now?.timestamp ?? fallback;

  return { timestamp: timestamp };
}
