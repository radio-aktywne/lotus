import type { QueryClient } from "@tanstack/react-query";

import type { User } from "../../../../common/identity/types";

export type Identity = {
  user: null | User;
};

export type GetIdentityInput = {
  queryClient?: QueryClient;
};

export type GetIdentityOutput = {
  identity: Identity;
  queryClient: QueryClient;
};
