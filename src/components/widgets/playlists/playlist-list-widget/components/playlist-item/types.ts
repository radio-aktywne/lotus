import { ListPlaylistsOutput } from "../../../../../../lib/pelican/playlists/list-playlists";

export type PlaylistItemInput = {
  playlist: ListPlaylistsOutput["playlists"]["playlists"][number];
};
