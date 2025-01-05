import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { NewPlaylistPageMetadata } from "../../../../components/metadata/playlists/new-playlist-page-metadata";
import { NewPlaylistPageView } from "../../../../components/views/playlists/new-playlist-page-view";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { NewPlaylistPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: NewPlaylistPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: "lotus" })),
    title: t(i18n)(msg({ message: "New playlist • lotus" })),
  };
}

export default function NewPlaylistPage({}: NewPlaylistPageInput) {
  return (
    <>
      <NewPlaylistPageMetadata />
      <NewPlaylistPageView />
    </>
  );
}
