import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { PlaylistAddPageMetadata } from "../../../../../../components/metadata/playlists/playlist/add/playlist-add-page-metadata";
import { PlaylistAddPageView } from "../../../../../../components/views/playlists/playlist/add/playlist-add-page-view";
import { getLanguage } from "../../../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../../../lib/i18n/load-locale";
import { PlaylistAddPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PlaylistAddPageInput): Promise<Metadata> {
  const id = params.id;

  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "lotus" })),
    title: i18n._(msg({ message: `Add media to playlist ${id} • lotus` })),
  };
}

export default function PlaylistPage({ params }: PlaylistAddPageInput) {
  const id = params.id;

  return (
    <>
      <PlaylistAddPageMetadata id={id} />
      <PlaylistAddPageView id={id} />
    </>
  );
}
