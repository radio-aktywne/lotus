import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { InvalidInputError } from "./errors";
import { CreatePlaylistInput, CreatePlaylistOutput } from "./types";

export async function createPlaylist({
  id,
  name,
}: CreatePlaylistInput): Promise<CreatePlaylistOutput> {
  const { data, error, response } = await pelican.POST("/playlists", {
    body: {
      id: id,
      name: name,
    },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    throw new PelicanError();
  }

  return { playlist: data };
}
