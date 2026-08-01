"use client";

import type { HistoryProviderInput } from "./types";

import { HistorySynchronizer } from "./components/history-synchronizer";

export function HistoryProvider({ children }: HistoryProviderInput) {
  return (
    <>
      <HistorySynchronizer />
      {children}
    </>
  );
}
