import { commonLocalizationConstants } from "../../constants";

export function getLocalesWithFallbacks(locales: string[]) {
  const localesSet = new Set(locales);

  return locales.reduce<string[]>((accumulator, locale, index) => {
    const current = new Intl.Locale(locale);

    const last = accumulator.at(-1);
    const previous = last === undefined ? undefined : new Intl.Locale(last);

    return [
      ...accumulator,
      ...(previous !== undefined &&
      current.language !== previous.language &&
      !localesSet.has(previous.language) &&
      !accumulator.includes(previous.language)
        ? [previous.language]
        : []),
      current.toString(),
      ...(index === locales.length - 1 &&
      current.language !== current.toString() &&
      !accumulator.includes(current.language)
        ? [current.language]
        : []),
    ];
  }, []);
}

export function checkSupport(locale: string) {
  return commonLocalizationConstants.locales.supported.find(
    (value) => value === locale,
  );
}
