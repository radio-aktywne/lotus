import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { RootPageMetadata } from "../components/metadata/root/root-page-metadata";
import { RootPageView } from "../components/views/root/root-page-view";
import { getLanguage } from "../lib/i18n/get-language";
import { loadLocale } from "../lib/i18n/load-locale";
import { RootPageInput } from "./types";

export async function generateMetadata(): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: "lotus" })),
    title: t(i18n)(msg({ message: "lotus" })),
  };
}

export default function RootPage({}: RootPageInput) {
  return (
    <>
      <RootPageMetadata />
      <RootPageView />
    </>
  );
}
