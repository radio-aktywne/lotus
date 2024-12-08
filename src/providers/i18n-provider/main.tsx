"use client";

import { i18n } from "@lingui/core";
import { I18nProvider as InternalI18nProvider } from "@lingui/react";
import { useEffect, useState } from "react";

import { defaultLocale } from "../../constants";
import { useDocumentMetadata } from "../../hooks/use-document-metadata";
import { useLanguage } from "../../hooks/use-language";
import { loadLocale } from "../../lib/i18n/load-locale";
import { I18nProviderInput } from "./types";

export function I18nProvider({ children }: I18nProviderInput) {
  const [locale, setLocale] = useState(defaultLocale);

  const { language } = useLanguage();

  useEffect(() => {
    loadLocale({ i18n, language }).then(({ locale }) => setLocale(locale));
  }, [language]);

  useDocumentMetadata({ language: locale });

  return <InternalI18nProvider i18n={i18n}>{children}</InternalI18nProvider>;
}
