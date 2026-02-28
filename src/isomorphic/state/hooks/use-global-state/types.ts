import type { State, StateSubscribe } from "../../types";

export type StateContainer = {
  current: State;
  snapshot: State;
  subscribe: StateSubscribe;
};

export type UseGlobalStateInput = object;

export type UseGlobalStateOutput = {
  state: StateContainer;
};
