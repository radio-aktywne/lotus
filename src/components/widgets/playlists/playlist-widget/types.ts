import {
  GetPlaylistInput,
  GetPlaylistOutput,
} from "../../../../lib/pelican/playlists/get-playlist";

export type PlaylistWidgetBinding = NonNullable<
  GetPlaylistOutput["playlist"]["bindings"]
>[number];

export type PlaylistWidgetInput = {
  playlist: GetPlaylistOutput["playlist"];
} & GetPlaylistInput;
