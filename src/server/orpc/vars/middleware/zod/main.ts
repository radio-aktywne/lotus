import * as z from "zod";

import type { ZodMiddlewareOutputContext } from "./types";

import { getLocalization } from "../../../../localization/lib/get-localization";
import { localeMiddleware } from "../locale";
import { isExecuted } from "./utils";
import { storage } from "./vars";

export const zodMiddleware = localeMiddleware.concat(
  async ({ context, next }) => {
    if (isExecuted(context))
      return next({
        context: {
          zodMiddleware: {
            executed: context.zodMiddleware.executed,
          },
        } as ZodMiddlewareOutputContext,
      });

    const { localization } = getLocalization({
      locale: context.localeMiddleware.locale,
    });

    const data = {
      locale: localization.data.zod,
    };

    return storage.run(data, async () => {
      z.config({
        localeError: (...args) =>
          storage.getStore()?.locale.localeError(...args),
      });

      return await next({
        context: {
          zodMiddleware: {
            executed: true,
          },
        } as ZodMiddlewareOutputContext,
      });
    });
  },
);
