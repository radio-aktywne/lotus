import type { ReadonlyState, State, StateSubscribe } from "../../types";

export type StateContainer = {
  current: State;
  snapshot: ReadonlyState;
  subscribe: StateSubscribe;
};

export type UseGlobalStateInput = object;

export type UseGlobalStateOutput = {
  state: StateContainer;
};
