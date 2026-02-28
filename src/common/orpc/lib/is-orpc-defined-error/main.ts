import { ORPCError } from "@orpc/contract";

import type { ORPCDefinedError } from "../../types/inferred";

export function isOrpcDefinedError(error: unknown): error is ORPCDefinedError {
  return error instanceof ORPCError;
}
