import type { AuthenticatedMiddlewareOutputContext } from "./types";

import { isMiddlewareExecuted } from "../../../lib/middleware/is-middleware-executed";

export function isExecuted(
  context: unknown,
): context is AuthenticatedMiddlewareOutputContext {
  return isMiddlewareExecuted(context, "authenticated");
}
