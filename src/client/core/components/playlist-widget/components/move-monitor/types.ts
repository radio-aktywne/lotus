import type { SetNonNullableDeep } from "type-fest";

import type { PlaylistsModelsPlaylist } from "../../../../../../common/apis/pelican/types";

export type MoveMonitorInput = {
  playlist: SetNonNullableDeep<PlaylistsModelsPlaylist, "bindings">;
};
