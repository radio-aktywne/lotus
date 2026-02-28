import { proxy } from "valtio/vanilla";

import type { State } from "../../types";

import {
  StateAlreadyInitializedError,
  StateNotInitializedError,
} from "../../errors";
import { constants } from "./constants";

export class GlobalVariable<T> {
  get current(): T | undefined {
    return this.store[this.key];
  }

  set current(value: T) {
    this.store[this.key] = value;
  }

  private readonly key: symbol;
  private readonly store: { [K in typeof this.key]: T };

  constructor(key: string) {
    this.key = Symbol.for(key);
    this.store = globalThis;
  }
}

export class StateVariable {
  get current(): State {
    if (this.variable.current === undefined)
      throw new StateNotInitializedError();

    return this.variable.current;
  }

  set current(state: State) {
    if (this.variable.current !== undefined)
      throw new StateAlreadyInitializedError();

    this.variable.current = proxy(state);
  }

  private readonly variable = new GlobalVariable<State>(constants.key);
}
