import type { ReadonlyState } from "../../../state/types";

export type UseHistoryHistory = ReadonlyState["history"];

export type UseHistoryInput = object;

export type UseHistoryOutput = {
  history: UseHistoryHistory;
};
