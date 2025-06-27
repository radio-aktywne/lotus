import { notFound } from "next/navigation";

import {
  getPlaylist,
  PlaylistNotFoundError,
} from "../../../../../lib/pelican/playlists/get-playlist";
import { PlaylistWidget } from "../../../../widgets/playlists/playlist-widget";
import { PlaylistPageViewInput } from "./types";

export async function PlaylistPageView({ id }: PlaylistPageViewInput) {
  const include = JSON.stringify({
    bindings: { include: { media: true }, orderBy: { rank: "asc" } },
  });

  try {
    const { playlist } = await getPlaylist({ id: id, include });

    return <PlaylistWidget id={id} include={include} playlist={playlist} />;
  } catch (error) {
    if (error instanceof PlaylistNotFoundError) notFound();
    throw error;
  }
}
