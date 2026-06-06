import type { User } from "../../../../common/identity/types";

export type GetUserInput = {
  headers: Headers;
};

export type GetUserOutput = {
  user: null | User;
};
