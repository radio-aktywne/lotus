import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { NewPlaylistPageMetadata } from "../../../../../components/metadata/playlists/new/new-playlist-page-metadata";
import { NewPlaylistPageView } from "../../../../../components/views/playlists/new/new-playlist-page-view";
import { getLanguage } from "../../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../../lib/i18n/load-locale";
import { NewPlaylistPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: NewPlaylistPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "lotus" })),
    title: i18n._(msg({ message: "New playlist • lotus" })),
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
