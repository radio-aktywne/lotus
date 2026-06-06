import type { UserMiddlewareOutputContext } from "./types";

import { getUser } from "../../../../identity/lib/get-user";
import { state } from "../../../../state/vars/state";
import { headersMiddleware } from "../headers";
import { isExecuted } from "./utils";

export const userMiddleware = headersMiddleware.concat(
  async ({ context, next }) => {
    if (isExecuted(context))
      return next({
        context: {
          userMiddleware: {
            executed: context.userMiddleware.executed,
            user: context.userMiddleware.user,
          },
        } satisfies UserMiddlewareOutputContext as UserMiddlewareOutputContext,
      });

    const headers = context.headersMiddleware.headers;

    const { user: resolvedUser } = await getUser({ headers: headers });
    const fallbackUser = state.current.config.debug
      ? state.current.config.identity.users.debug
      : null;
    const user = resolvedUser ?? fallbackUser;

    return next({
      context: {
        userMiddleware: {
          executed: true,
          user: user,
        },
      } satisfies UserMiddlewareOutputContext as UserMiddlewareOutputContext,
    });
  },
);
