import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { MediaListPageMetadata } from "../../components/metadata/media/media-list-page-metadata";
import { MediaListPageView } from "../../components/views/media/media-list-page-view";
import { getLanguage } from "../../lib/i18n/get-language";
import { loadLocale } from "../../lib/i18n/load-locale";
import { MediaListPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: "Media • lotus" })),
    title: t(i18n)(msg({ message: "lotus" })),
  };
}

export default function MediaListPage({}: MediaListPageInput) {
  return (
    <>
      <MediaListPageMetadata />
      <MediaListPageView />
    </>
  );
}
