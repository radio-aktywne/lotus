import { components } from "../../../../services/pelican";

export type ListPlaylistsInput = {
  include?: null | string;
  limit?: null | number;
  offset?: null | number;
  order?: null | string;
  where?: null | string;
};

export type ListPlaylistsOutput = {
  playlists: components["schemas"]["PlaylistList"];
};
