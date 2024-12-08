import { headers } from "next/headers";

export function getAcceptLanguageHeader() {
  return headers().get("Accept-Language");
}

export function parseAcceptLanguageHeader(acceptLanguageHeader: string) {
  const parsed = acceptLanguageHeader.split(",").map((preference) => {
    const parts = preference.trim().split(";q=");
    return {
      language: parts[0]!,
      quality: parts[1] ? parseFloat(parts[1]) : 1,
    };
  });

  return parsed
    .sort((a, b) => b.quality - a.quality)
    .map((preference) => preference.language);
}
