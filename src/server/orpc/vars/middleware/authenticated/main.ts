import type { ORPCDefinedErrors } from "../../../types/inferred";
import type { AuthenticatedMiddlewareOutputContext } from "./types";

import { isAuthenticated } from "../../../../../common/access/lib/is-authenticated";
import { userMiddleware } from "../user";
import { isExecuted } from "./utils";

export const authenticatedMiddleware = userMiddleware.concat(
  async ({ context, errors, next }) => {
    if (isExecuted(context))
      return next({
        context: {
          authenticatedMiddleware: {
            executed: context.authenticatedMiddleware.executed,
            user: context.authenticatedMiddleware.user,
          },
        } satisfies AuthenticatedMiddlewareOutputContext as AuthenticatedMiddlewareOutputContext,
      });

    const user = context.userMiddleware.user;

    if (!isAuthenticated(user)) throw (errors as ORPCDefinedErrors).FORBIDDEN();

    return next({
      context: {
        authenticatedMiddleware: {
          executed: true,
          user: user,
        },
      } satisfies AuthenticatedMiddlewareOutputContext as AuthenticatedMiddlewareOutputContext,
    });
  },
);
