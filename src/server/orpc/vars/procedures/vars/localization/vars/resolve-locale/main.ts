import { orpcServerRootBase } from "../../../../../bases/root";
import { localeMiddleware } from "../../../../../middleware/locale";

export const resolveLocale = orpcServerRootBase.localization.resolveLocale
  .use(localeMiddleware)
  .handler(async ({ context }) => ({
    locale: context.localeMiddleware.locale,
  }));
