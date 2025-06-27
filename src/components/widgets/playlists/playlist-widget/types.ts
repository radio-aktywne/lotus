import {
  GetPlaylistInput,
  GetPlaylistOutput,
} from "../../../../lib/pelican/playlists/get-playlist";

export type PlaylistWidgetInput = {
  playlist: GetPlaylistOutput["playlist"];
} & GetPlaylistInput;
