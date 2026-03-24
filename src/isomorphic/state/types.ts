import "client-only";

export type NowState = {
  counter: number;
  timer: number;
  timestamp: number;
};

export type State = {
  now?: NowState;
};

export type StateSubscribeCallback = (state: State) => void;

export type StateUnsubscribe = () => void;

export type StateSubscribe = (
  callback: StateSubscribeCallback,
) => StateUnsubscribe;
