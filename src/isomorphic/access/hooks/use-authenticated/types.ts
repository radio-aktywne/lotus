import type { User } from "../../../../common/identity/types";

export type UseAuthenticatedInput = {
  user: null | User;
};

export type UseAuthenticatedOutput = {
  user: User;
};
