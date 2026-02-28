import type { SupportedLocale } from "../../types";

export type GetSupportedLocaleInput = {
  locales: string[];
};

export type GetSupportedLocaleOutput = {
  locale: SupportedLocale;
};
