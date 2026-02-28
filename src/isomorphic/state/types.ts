import "client-only";

export type State = {
  now?: {
    counter: number;
    timer: number;
    timestamp: number;
  };
};

export type StateSubscribeCallback = (state: State) => void;

export type StateUnsubscribe = () => void;

export type StateSubscribe = (
  callback: StateSubscribeCallback,
) => StateUnsubscribe;
