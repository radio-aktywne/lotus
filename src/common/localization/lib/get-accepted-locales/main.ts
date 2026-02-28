import type {
  GetAcceptedLocalesInput,
  GetAcceptedLocalesOutput,
} from "./types";

import { getAcceptLanguageHeader, parseLocalePreference } from "./utils";

export function getAcceptedLocales({
  headers,
}: GetAcceptedLocalesInput): GetAcceptedLocalesOutput {
  const locales = getAcceptLanguageHeader(headers)
    .split(",")
    .map((preference) => parseLocalePreference(preference))
    .filter((preference) => !isNaN(preference.weight))
    .sort((a, b) => b.weight - a.weight)
    .map((preference) => preference.locale)
    .filter((locale) => locale !== null)
    .map((locale) => locale.toString());

  return { locales: locales };
}
