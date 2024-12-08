import {
  ListPlaylistsInput,
  ListPlaylistsOutput,
} from "../../../../lib/pelican/playlists/list-playlists";

export type PlaylistListWidgetInput = {
  perPage?: number;
  playlists: ListPlaylistsOutput["playlists"];
  where?: ListPlaylistsInput["where"];
};
