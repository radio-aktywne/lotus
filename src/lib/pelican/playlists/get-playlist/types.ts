import { components } from "../../../../services/pelican";

export type GetPlaylistInput = {
  id: string;
  include?: string;
};

export type GetPlaylistOutput = {
  playlist: components["schemas"]["playlists_models_Playlist"];
};
