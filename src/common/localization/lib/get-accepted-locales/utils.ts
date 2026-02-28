export function getAcceptLanguageHeader(headers: Headers) {
  return headers.get("Accept-Language") ?? "";
}

export function parseLocale(locale: string) {
  try {
    return new Intl.Locale(locale);
  } catch {
    return null;
  }
}

export function parseLocalePreference(preference: string) {
  const parts = preference.trim().split(";q=");
  const locale = parts[0] ? parseLocale(parts[0]) : null;
  const weight = parts[1] ? parseFloat(parts[1]) : 1;

  return { locale: locale, weight: weight };
}
