import { notFound } from "next/navigation";

import {
  getPlaylist,
  PlaylistNotFoundError,
} from "../../../../../../lib/pelican/playlists/get-playlist";
import { PlaylistAddWidget } from "../../../../../widgets/playlists/playlist-add-widget";
import { PlaylistAddPageViewInput } from "./types";

export async function PlaylistAddPageView({ id }: PlaylistAddPageViewInput) {
  try {
    const { playlist } = await getPlaylist({ id: id });

    return <PlaylistAddWidget id={id} playlist={playlist} />;
  } catch (error) {
    if (error instanceof PlaylistNotFoundError) notFound();
    throw error;
  }
}
