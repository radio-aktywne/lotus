import type { Lingui, SupportedLocale } from "../../types";

export type CreateLinguiInput = {
  locale: SupportedLocale;
};

export type CreateLinguiOutput = {
  lingui: Lingui;
};
