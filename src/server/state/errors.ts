import "server-only";

import { CustomError } from "../../common/generic/errors";

export class StateError extends CustomError {}

export class StateNotInitializedError extends StateError {
  constructor() {
    super("State is not initialized yet.");
  }
}

export class StateAlreadyInitializedError extends StateError {
  constructor() {
    super("State is already initialized.");
  }
}
