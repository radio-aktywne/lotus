import type { User } from "../../../../common/identity/types";

export type Identity = {
  user: null | User;
};

export type UseIdentityInput = object;

export type UseIdentityOutput = {
  identity: Identity;
};
