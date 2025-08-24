import {
  ListPlaylistsInput,
  ListPlaylistsOutput,
} from "../../../../lib/pelican/playlists/list-playlists";

export type PlaylistListWidgetInput = {
  limit: NonNullable<ListPlaylistsInput["limit"]>;
  playlists: ListPlaylistsOutput["playlists"];
} & Omit<ListPlaylistsInput, "limit">;
