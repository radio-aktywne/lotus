import { notFound } from "next/navigation";

import {
  getPlaylist,
  PlaylistNotFoundError,
} from "../../../../../lib/pelican/playlists/get-playlist";
import { PlaylistWidget } from "../../../../widgets/playlists/playlist-widget";
import { PlaylistPageViewInput } from "./types";

export async function PlaylistPageView({ id }: PlaylistPageViewInput) {
  const props = {
    id: id,
    include: JSON.stringify({
      bindings: { include: { media: true }, orderBy: { rank: "asc" } },
    }),
  };

  try {
    const { playlist } = await getPlaylist(props);

    return <PlaylistWidget playlist={playlist} {...props} />;
  } catch (error) {
    if (error instanceof PlaylistNotFoundError) notFound();
    throw error;
  }
}
