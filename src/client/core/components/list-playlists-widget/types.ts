import type { PlaylistOrderByInput } from "../../../../common/apis/pelican/types";

export type ListPlaylistsWidgetInput = {
  limit: number;
  order: PlaylistOrderByInput;
  page: number;
  query?: string;
};
