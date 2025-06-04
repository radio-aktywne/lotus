import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { NewBindingPageMetadata } from "../../../../components/metadata/bindings/new/new-binding-page-metadata";
import { NewBindingPageView } from "../../../../components/views/bindings/new/new-binding-page-view";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { NewBindingPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: NewBindingPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "lotus" })),
    title: i18n._(msg({ message: "New binding • lotus" })),
  };
}

export default function NewBindingPage({}: NewBindingPageInput) {
  return (
    <>
      <NewBindingPageMetadata />
      <NewBindingPageView />
    </>
  );
}
