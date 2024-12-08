import "server-only";

import { defaultUserLanguage } from "../../../constants";
import { GetLanguageInput, GetLanguageOutput } from "./types";
import { getAcceptLanguageHeader, parseAcceptLanguageHeader } from "./utils";

export function getLanguage({}: GetLanguageInput = {}): GetLanguageOutput {
  const acceptLanguageHeader = getAcceptLanguageHeader();

  if (!acceptLanguageHeader) return { language: defaultUserLanguage };

  const languages = parseAcceptLanguageHeader(acceptLanguageHeader);

  return { language: languages[0] ?? defaultUserLanguage };
}
