import { I18n } from "@lingui/core";

export type LoadLocaleInput = {
  i18n: I18n;
  language: string;
};

export type LoadLocaleOutput = {
  locale: string;
};
