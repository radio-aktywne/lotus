import type { PlaylistsModelsPlaylist } from "../../../../../../common/apis/pelican/types";

export type PlaylistItemInput = {
  onDelete?: () => Promise<unknown>;
  playlist: Omit<PlaylistsModelsPlaylist, "bindings">;
};
