import { notFound } from "next/navigation";

import {
  getPlaylist,
  PlaylistNotFoundError,
} from "../../../../../../lib/pelican/playlists/get-playlist";
import { EditPlaylistWidget } from "../../../../../widgets/playlists/edit-playlist-widget";
import { EditPlaylistPageViewInput } from "./types";

export async function EditPlaylistPageView({ id }: EditPlaylistPageViewInput) {
  try {
    const { playlist } = await getPlaylist({ id: id });

    return <EditPlaylistWidget id={id} playlist={playlist} />;
  } catch (error) {
    if (error instanceof PlaylistNotFoundError) notFound();
    throw error;
  }
}
