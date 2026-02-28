import type { ZodMiddlewareOutputContext } from "./types";

import { isMiddlewareExecuted } from "../../../lib/middleware/is-middleware-executed";

export function isExecuted(
  context: unknown,
): context is ZodMiddlewareOutputContext {
  return isMiddlewareExecuted(context, "zod");
}
