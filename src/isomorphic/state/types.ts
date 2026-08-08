import "client-only";

import type { ReadonlyDeep } from "type-fest";

export type HistoryEntry = {
  path: string;
  query?: { [key: string]: string | string[] };
};

export type HistoryState = {
  entries: HistoryEntry[];
};

export type NowState = {
  counter: number;
  timer: number;
  timestamp: number;
};

export type State = {
  history: HistoryState;
  now?: NowState;
};

export type ReadonlyState = ReadonlyDeep<State>;

export type StateSubscribeCallback = (state: State) => void;

export type StateUnsubscribe = () => void;

export type StateSubscribe = (
  callback: StateSubscribeCallback,
) => StateUnsubscribe;
