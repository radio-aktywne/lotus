import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { NewMediaPageMetadata } from "../../../../components/metadata/media/new/new-media-page-metadata";
import { NewMediaPageView } from "../../../../components/views/media/new/new-media-page-view";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { NewMediaPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: NewMediaPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "lotus" })),
    title: i18n._(msg({ message: "New media • lotus" })),
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
