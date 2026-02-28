import type { HeadersMiddlewareOutputContext } from "./types";

import { isMiddlewareExecuted } from "../../../lib/middleware/is-middleware-executed";

export function isExecuted(
  context: unknown,
): context is HeadersMiddlewareOutputContext {
  return isMiddlewareExecuted(context, "headers");
}
