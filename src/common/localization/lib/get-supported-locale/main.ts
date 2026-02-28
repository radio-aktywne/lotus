import type {
  GetSupportedLocaleInput,
  GetSupportedLocaleOutput,
} from "./types";

import { commonLocalizationConstants } from "../../constants";
import { checkSupport, getLocalesWithFallbacks } from "./utils";

export function getSupportedLocale({
  locales,
}: GetSupportedLocaleInput): GetSupportedLocaleOutput {
  for (const locale of getLocalesWithFallbacks(locales)) {
    const supported = checkSupport(locale);
    if (supported !== undefined) {
      return { locale: supported };
    }
  }

  return { locale: commonLocalizationConstants.locales.default };
}
