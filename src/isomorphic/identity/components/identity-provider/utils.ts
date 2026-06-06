import { proxy } from "valtio";

import type { User } from "../../../../common/identity/types";
import type { IdentityContextValue } from "../../contexts/identity";

export function createInitialIdentityContextValue(user: null | User) {
  return proxy({ user: user } satisfies IdentityContextValue);
}
