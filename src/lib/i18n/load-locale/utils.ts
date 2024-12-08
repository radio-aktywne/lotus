import { I18n, Messages } from "@lingui/core";

import { defaultLocale } from "../../../constants";

export function getLocale(language: string) {
  try {
    return new Intl.Locale(language);
  } catch {
    return new Intl.Locale(defaultLocale);
  }
}

export async function tryImport(locale: string) {
  try {
    const imported = await import(`../../../locales/${locale}.po`);
    return imported as { messages: Messages };
  } catch {
    return null;
  }
}

export function activate(i18n: I18n, locale: string, messages: Messages) {
  i18n.load(locale, messages);
  i18n.activate(locale);
}
