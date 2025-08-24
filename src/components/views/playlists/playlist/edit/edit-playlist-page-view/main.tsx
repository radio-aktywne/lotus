import { notFound } from "next/navigation";

import {
  getPlaylist,
  PlaylistNotFoundError,
} from "../../../../../../lib/pelican/playlists/get-playlist";
import { EditPlaylistWidget } from "../../../../../widgets/playlists/edit-playlist-widget";
import { EditPlaylistPageViewInput } from "./types";

export async function EditPlaylistPageView({ id }: EditPlaylistPageViewInput) {
  const props = { id: id };

  try {
    const { playlist } = await getPlaylist(props);

    return <EditPlaylistWidget playlist={playlist} {...props} />;
  } catch (error) {
    if (error instanceof PlaylistNotFoundError) notFound();
    throw error;
  }
}
