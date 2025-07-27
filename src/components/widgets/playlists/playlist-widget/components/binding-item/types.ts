import { GetPlaylistOutput } from "../../../../../../lib/pelican/playlists/get-playlist";

export type BindingItemInput = {
  binding: NonNullable<GetPlaylistOutput["playlist"]["bindings"]>[number];
  index: number;
  onRemove?: () => void;
  total: number;
};
