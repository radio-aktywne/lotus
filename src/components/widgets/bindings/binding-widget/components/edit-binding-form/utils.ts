import { UseListMediaSuccessState } from "../../../../../../hooks/pelican/media/use-list-media/types";
import { UseListPlaylistsSuccessState } from "../../../../../../hooks/pelican/playlists/use-list-playlists/types";

export function getMediaLabel(
  media: UseListMediaSuccessState["data"]["media"][number],
) {
  return media.name;
}

export function getPlaylistLabel(
  playlist: UseListPlaylistsSuccessState["data"]["playlists"][number],
) {
  return playlist.name;
}
