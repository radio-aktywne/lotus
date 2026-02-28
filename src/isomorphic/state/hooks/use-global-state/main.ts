import { useCallback, useMemo } from "react";
import {
  useSnapshot as useValtioSnapshot,
  subscribe as valtioSubscribe,
} from "valtio";

import type { StateSubscribeCallback } from "../../types";
import type { UseGlobalStateInput, UseGlobalStateOutput } from "./types";

import { useSafeContext } from "../../../generic/hooks/use-safe-context";
import { StateContext } from "../../contexts/state";

export function useGlobalState({}: UseGlobalStateInput = {}): UseGlobalStateOutput {
  const current = useSafeContext(StateContext);
  const snapshot = useValtioSnapshot(current);

  const subscribe = useCallback(
    (callback: StateSubscribeCallback) =>
      valtioSubscribe(current, () => callback(current)),
    [current],
  );

  const state = useMemo(
    () => ({
      current: current,
      snapshot: snapshot,
      subscribe: subscribe,
    }),
    [current, snapshot, subscribe],
  );

  return useMemo(() => ({ state: state }), [state]);
}
