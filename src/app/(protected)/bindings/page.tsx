import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { BindingListPageMetadata } from "../../../components/metadata/bindings/binding-list-page-metadata";
import { BindingListPageView } from "../../../components/views/bindings/binding-list-page-view";
import { getLanguage } from "../../../lib/i18n/get-language";
import { loadLocale } from "../../../lib/i18n/load-locale";
import { BindingListPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "lotus" })),
    title: i18n._(msg({ message: "Bindings • lotus" })),
  };
}

export default function BindingListPage({}: BindingListPageInput) {
  return (
    <>
      <BindingListPageMetadata />
      <BindingListPageView />
    </>
  );
}
