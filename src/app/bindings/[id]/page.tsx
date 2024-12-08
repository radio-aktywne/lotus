import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { BindingPageMetadata } from "../../../components/metadata/bindings/binding-page-metadata";
import { BindingPageView } from "../../../components/views/bindings/binding-page-view";
import { getLanguage } from "../../../lib/i18n/get-language";
import { loadLocale } from "../../../lib/i18n/load-locale";
import { BindingPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BindingPageInput): Promise<Metadata> {
  const id = params.id;

  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: `Binding ${id} • lotus` })),
    title: t(i18n)(msg({ message: "lotus" })),
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
