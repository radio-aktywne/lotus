"use client";

import { range } from "es-toolkit/math";
import { useCallback } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import type { HistoryLinkInput } from "./types";

import { LocalizedLink } from "../../../routing/components/localized-link";
import { useGlobalState } from "../../../state/hooks/use-global-state";

export function HistoryLink({ actions, ...input }: HistoryLinkInput) {
  const { state } = useGlobalState();

  const cachedActions = useDeepCompareMemo(() => actions, [actions]);

  const handleNavigate = useCallback(() => {
    const entries = state.current.history.entries;

    for (const action of cachedActions) {
      if (action.type === "pop") {
        range(action.count ?? 1).forEach(() => entries.pop());
      } else if (action.type === "push") {
        entries.push(...action.entries);
      }
    }
  }, [cachedActions, state.current.history.entries]);

  return <LocalizedLink {...input} onNavigate={handleNavigate} />;
}
