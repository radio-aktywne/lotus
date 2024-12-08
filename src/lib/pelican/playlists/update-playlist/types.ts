import { components } from "../../../../services/pelican";

export type UpdatePlaylistInput = {
  data: {
    id?: string;
    name?: string;
  };
  id: string;
};

export type UpdatePlaylistOutput = {
  playlist: components["schemas"]["playlists_models_Playlist"];
};
