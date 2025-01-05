import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { PlaylistPageMetadata } from "../../../../components/metadata/playlists/playlist-page-metadata";
import { PlaylistPageView } from "../../../../components/views/playlists/playlist-page-view";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { PlaylistPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PlaylistPageInput): Promise<Metadata> {
  const id = params.id;

  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: "lotus" })),
    title: t(i18n)(msg({ message: `Playlist ${id} • lotus` })),
  };
}

export default function PlaylistPage({ params }: PlaylistPageInput) {
  const id = params.id;

  return (
    <>
      <PlaylistPageMetadata id={id} />
      <PlaylistPageView id={id} />
    </>
  );
}
