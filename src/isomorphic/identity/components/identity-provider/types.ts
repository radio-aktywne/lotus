import type { PropsWithChildren } from "react";

import type { User } from "../../../../common/identity/types";

export type IdentityProviderInput = PropsWithChildren<{
  user: null | User;
}>;
