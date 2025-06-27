import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { EditPlaylistPageMetadata } from "../../../../../../components/metadata/playlists/playlist/edit/edit-playlist-page-metadata";
import { EditPlaylistPageView } from "../../../../../../components/views/playlists/playlist/edit/edit-playlist-page-view";
import { getLanguage } from "../../../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../../../lib/i18n/load-locale";
import { EditPlaylistPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: EditPlaylistPageInput): Promise<Metadata> {
  const id = params.id;

  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "lotus" })),
    title: i18n._(msg({ message: `Edit playlist ${id} • lotus` })),
  };
}

export default function EditPlaylistPage({ params }: EditPlaylistPageInput) {
  const id = params.id;

  return (
    <>
      <EditPlaylistPageMetadata id={id} />
      <EditPlaylistPageView id={id} />
    </>
  );
}
