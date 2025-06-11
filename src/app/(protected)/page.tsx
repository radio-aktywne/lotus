import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { RootPageMetadata } from "../../components/metadata/root/root-page-metadata";
import { RootPageView } from "../../components/views/root/root-page-view";
import { getLanguage } from "../../lib/i18n/get-language";
import { loadLocale } from "../../lib/i18n/load-locale";
import { RootPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "lotus" })),
    title: i18n._(msg({ message: "lotus" })),
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
