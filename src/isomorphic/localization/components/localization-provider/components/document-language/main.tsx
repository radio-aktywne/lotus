import { useEffect } from "react";

import type { DocumentLanguageInput } from "./types";

import { useLocalization } from "../../../../hooks/use-localization";

export function DocumentLanguage({}: DocumentLanguageInput) {
  const { localization } = useLocalization();

  useEffect(() => {
    if (localization.locale === undefined) return;

    document.querySelector("html")?.setAttribute("lang", localization.locale);
  }, [localization.locale]);

  return null;
}
