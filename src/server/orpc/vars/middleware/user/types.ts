import type { User } from "../../../../../common/identity/types";
import type { MiddlewareOutputContext } from "../../../types/middleware";

export type UserMiddlewareOutputContext = MiddlewareOutputContext<
  "user",
  {
    user: null | User;
  }
>;
