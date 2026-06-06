import type { User } from "../../../identity/types";

export function isAuthenticated(user: null | User): user is User {
  return user !== null;
}
