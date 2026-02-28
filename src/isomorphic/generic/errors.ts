import "client-only";

import { CustomError } from "../../common/generic/errors";

export class ContextUsageError extends CustomError {
  constructor(name?: string, options?: ErrorOptions) {
    super(
      name === undefined
        ? "Context used outside of its provider."
        : `Context "${name}" used outside of its provider.`,
      options,
    );
  }
}
