import { useMemo } from "react";

import type { UseHistoryInput, UseHistoryOutput } from "./types";

import { useGlobalState } from "../../../state/hooks/use-global-state";

export function useHistory({}: UseHistoryInput = {}): UseHistoryOutput {
  const { state } = useGlobalState();

  const history = state.snapshot.history;

  return useMemo(() => ({ history: history }), [history]);
}
