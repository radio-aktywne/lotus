import type { SupportedLocale } from "../localization/types";

export type LocaleRoutes = {
  [route: string]: string;
};

export type LocalizedRoutes = {
  [Locale in SupportedLocale]: LocaleRoutes;
};
