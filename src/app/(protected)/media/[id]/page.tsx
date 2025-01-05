import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { MediaPageMetadata } from "../../../../components/metadata/media/media-page-metadata";
import { MediaPageView } from "../../../../components/views/media/media-page-view";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { MediaPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: MediaPageInput): Promise<Metadata> {
  const id = params.id;

  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: "lotus" })),
    title: t(i18n)(msg({ message: `Media ${id} • lotus` })),
  };
}

export default function MediaPage({ params }: MediaPageInput) {
  const id = params.id;

  return (
    <>
      <MediaPageMetadata id={id} />
      <MediaPageView id={id} />
    </>
  );
}
