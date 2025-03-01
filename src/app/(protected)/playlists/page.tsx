import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { PlaylistListPageMetadata } from "../../../components/metadata/playlists/playlist-list-page-metadata";
import { PlaylistListPageView } from "../../../components/views/playlists/playlist-list-page-view";
import { getLanguage } from "../../../lib/i18n/get-language";
import { loadLocale } from "../../../lib/i18n/load-locale";
import { PlaylistListPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "lotus" })),
    title: i18n._(msg({ message: "Playlists • lotus" })),
  };
}

export default function PlaylistListPage({}: PlaylistListPageInput) {
  return (
    <>
      <PlaylistListPageMetadata />
      <PlaylistListPageView />
    </>
  );
}
