import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { NewMediaPageMetadata } from "../../../../components/metadata/media/new-media-page-metadata";
import { NewMediaPageView } from "../../../../components/views/media/new-media-page-view";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { NewMediaPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: NewMediaPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: "lotus" })),
    title: t(i18n)(msg({ message: "New media • lotus" })),
  };
}

export default function NewMediaPage({}: NewMediaPageInput) {
  return (
    <>
      <NewMediaPageMetadata />
      <NewMediaPageView />
    </>
  );
}
