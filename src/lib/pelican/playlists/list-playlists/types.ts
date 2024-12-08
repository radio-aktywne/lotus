import { components } from "../../../../services/pelican";

export type ListPlaylistsInput = {
  include?: string;
  limit?: number;
  offset?: number;
  order?: string;
  where?: string;
};

export type ListPlaylistsOutput = {
  playlists: components["schemas"]["PlaylistList"];
};
