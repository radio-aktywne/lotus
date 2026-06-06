import type { User } from "../../../../../common/identity/types";
import type { MiddlewareOutputContext } from "../../../types/middleware";

export type AuthenticatedMiddlewareOutputContext = MiddlewareOutputContext<
  "authenticated",
  {
    user: User;
  }
>;
