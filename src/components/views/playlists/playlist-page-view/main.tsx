import { notFound } from "next/navigation";

import {
  getPlaylist,
  PlaylistNotFoundError,
} from "../../../../lib/pelican/playlists/get-playlist";
import { PlaylistWidget } from "../../../widgets/playlists/playlist-widget";
import { PlaylistPageViewInput } from "./types";

export async function PlaylistPageView({ id }: PlaylistPageViewInput) {
  try {
    const { playlist } = await getPlaylist({ id: id });

    return <PlaylistWidget playlist={playlist} />;
  } catch (error) {
    if (error instanceof PlaylistNotFoundError) notFound();
    throw error;
  }
}
