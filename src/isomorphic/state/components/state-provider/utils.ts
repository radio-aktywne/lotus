import { proxy } from "valtio";

import type { State } from "../../types";

export function createInitialState() {
  return proxy({} satisfies State);
}
