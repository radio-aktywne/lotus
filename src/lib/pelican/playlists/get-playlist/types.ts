import { components } from "../../../../services/pelican";

export type GetPlaylistInput = {
  id: string;
  include?: null | string;
};

export type GetPlaylistOutput = {
  playlist: components["schemas"]["playlists_models_Playlist"];
};
