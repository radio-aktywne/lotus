import { defaultLocale } from "../../../constants";
import { defaultMessages } from "./constants";
import { LoadLocaleInput, LoadLocaleOutput } from "./types";
import { activate, getLocale, tryImport } from "./utils";

export async function loadLocale({
  i18n,
  language,
}: LoadLocaleInput): Promise<LoadLocaleOutput> {
  const locale = getLocale(language);

  const fullImported = await tryImport(locale.baseName);
  if (fullImported) {
    activate(i18n, locale.baseName, fullImported.messages);
    return { locale: locale.baseName };
  }

  const languageImported = await tryImport(locale.language);
  if (languageImported) {
    activate(i18n, locale.language, languageImported.messages);
    return { locale: locale.language };
  }

  activate(i18n, defaultLocale, defaultMessages);
  return { locale: defaultLocale };
}
