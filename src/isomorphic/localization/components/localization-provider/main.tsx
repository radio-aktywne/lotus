"use client";

import { I18nProvider } from "@lingui/react";
import { useMemo } from "react";

import type { LocalizationProviderInput } from "./types";

import { createLingui } from "../../../../common/localization/lib/create-lingui";
import { DocumentLanguage } from "./components/document-language";
import { LocalizationSynchronizer } from "./components/localization-synchronizer";

export function LocalizationProvider({
  children,
  locale,
}: LocalizationProviderInput) {
  const { lingui } = useMemo(() => createLingui({ locale: locale }), [locale]);

  return (
    <I18nProvider i18n={lingui}>
      <LocalizationSynchronizer />
      <DocumentLanguage />
      {children}
    </I18nProvider>
  );
}
