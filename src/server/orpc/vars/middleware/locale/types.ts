import type { SupportedLocale } from "../../../../../common/localization/types";
import type { MiddlewareOutputContext } from "../../../types/middleware";

export type LocaleMiddlewareOutputContext = MiddlewareOutputContext<
  "locale",
  {
    locale: SupportedLocale;
  }
>;
