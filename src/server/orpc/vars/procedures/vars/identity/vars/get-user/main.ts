import { orpcServerRootBase } from "../../../../../bases/root";
import { userMiddleware } from "../../../../../middleware/user";

export const getUser = orpcServerRootBase.identity.getUser
  .use(userMiddleware)
  .handler(async ({ context }) => ({
    user: context.userMiddleware.user,
  }));
