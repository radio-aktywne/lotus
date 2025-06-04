import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { BindingPageMetadata } from "../../../../components/metadata/bindings/binding/binding-page-metadata";
import { BindingPageView } from "../../../../components/views/bindings/binding/binding-page-view";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { BindingPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BindingPageInput): Promise<Metadata> {
  const id = params.id;

  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "lotus" })),
    title: i18n._(msg({ message: `Binding ${id} • lotus` })),
  };
}

export default function BindingPage({ params }: BindingPageInput) {
  const id = params.id;

  return (
    <>
      <BindingPageMetadata id={id} />
      <BindingPageView id={id} />
    </>
  );
}
