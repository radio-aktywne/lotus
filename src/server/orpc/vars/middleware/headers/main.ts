import { headers } from "next/headers";

import type { HeadersMiddlewareOutputContext } from "./types";

import { orpcServerImplementer } from "../../implementer";
import { isExecuted } from "./utils";

export const headersMiddleware = orpcServerImplementer.middleware(
  async ({ context, next }) => {
    if (isExecuted(context))
      return next({
        context: {
          headersMiddleware: {
            executed: context.headersMiddleware.executed,
            headers: context.headersMiddleware.headers,
          },
        } as HeadersMiddlewareOutputContext,
      });

    return next({
      context: {
        headersMiddleware: {
          executed: true,
          headers: await headers(),
        },
      } as HeadersMiddlewareOutputContext,
    });
  },
);
