import { ListPlaylistsOutput } from "../../../../../../lib/pelican/playlists/list-playlists";

export type PlaylistItemInput = {
  onDelete?: () => void;
  playlist: ListPlaylistsOutput["playlists"]["playlists"][number];
};
