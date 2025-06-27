import { GetPlaylistOutput } from "../../../../../../lib/pelican/playlists/get-playlist";

export type BindingItemInput = {
  binding: NonNullable<GetPlaylistOutput["playlist"]["bindings"]>[number];
  onRemove?: () => void;
};
