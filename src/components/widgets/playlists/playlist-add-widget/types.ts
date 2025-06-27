import {
  GetPlaylistInput,
  GetPlaylistOutput,
} from "../../../../lib/pelican/playlists/get-playlist";

export type PlaylistAddWidgetInput = {
  playlist: GetPlaylistOutput["playlist"];
} & GetPlaylistInput;
