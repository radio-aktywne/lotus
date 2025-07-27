import { ListMediaOutput } from "../../../../lib/pelican/media/list-media";
import {
  GetPlaylistInput,
  GetPlaylistOutput,
} from "../../../../lib/pelican/playlists/get-playlist";

export type PlaylistWidgetBinding = NonNullable<
  GetPlaylistOutput["playlist"]["bindings"]
>[number];

export type PlaylistWidgetMedia = ListMediaOutput["media"]["media"][number];

export type PlaylistWidgetInput = {
  playlist: GetPlaylistOutput["playlist"];
} & GetPlaylistInput;
