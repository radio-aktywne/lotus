import {
  ListPlaylistsInput,
  ListPlaylistsOutput,
} from "../../../../lib/pelican/playlists/list-playlists";

export type PlaylistListWidgetInput = {
  playlists: ListPlaylistsOutput["playlists"];
} & ListPlaylistsInput;
