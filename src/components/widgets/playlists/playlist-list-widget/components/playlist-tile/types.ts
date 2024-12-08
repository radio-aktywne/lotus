import { ListPlaylistsOutput } from "../../../../../../lib/pelican/playlists/list-playlists";

export type PlaylistTileInput = {
  playlist: ListPlaylistsOutput["playlists"]["playlists"][number];
};
