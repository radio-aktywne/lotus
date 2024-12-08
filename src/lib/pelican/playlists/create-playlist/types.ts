import { components } from "../../../../services/pelican";

export type CreatePlaylistInput = {
  id?: string;
  name: string;
};

export type CreatePlaylistOutput = {
  playlist: components["schemas"]["playlists_models_Playlist"];
};
