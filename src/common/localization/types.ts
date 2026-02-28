import type { I18n } from "@lingui/core";

export type DayjsLocaleData = typeof import("dayjs/locale/en");

export type LinguiLocaleData = typeof import("./locales/en.po");

export type ZodLocaleData = ReturnType<typeof import("zod/locales").en>;

export type LocaleData = {
  dayjs: DayjsLocaleData;
  lingui: LinguiLocaleData;
  zod: ZodLocaleData;
};

export type Lingui = I18n;

export type SupportedLocale = "en" | "pl";
