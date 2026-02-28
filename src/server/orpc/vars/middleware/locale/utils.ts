import type { LocaleMiddlewareOutputContext } from "./types";

import { isMiddlewareExecuted } from "../../../lib/middleware/is-middleware-executed";

export function isExecuted(
  context: unknown,
): context is LocaleMiddlewareOutputContext {
  return isMiddlewareExecuted(context, "locale");
}
