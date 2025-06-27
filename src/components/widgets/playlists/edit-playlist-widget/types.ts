import {
  GetPlaylistInput,
  GetPlaylistOutput,
} from "../../../../lib/pelican/playlists/get-playlist";

export type EditPlaylistWidgetInput = {
  playlist: GetPlaylistOutput["playlist"];
} & GetPlaylistInput;
