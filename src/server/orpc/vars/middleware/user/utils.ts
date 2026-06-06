import type { UserMiddlewareOutputContext } from "./types";

import { isMiddlewareExecuted } from "../../../lib/middleware/is-middleware-executed";

export function isExecuted(
  context: unknown,
): context is UserMiddlewareOutputContext {
  return isMiddlewareExecuted(context, "user");
}
