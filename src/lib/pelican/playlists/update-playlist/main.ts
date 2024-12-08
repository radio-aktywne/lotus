import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { InvalidInputError, PlaylistNotFoundError } from "./errors";
import { UpdatePlaylistInput, UpdatePlaylistOutput } from "./types";

export async function updatePlaylist({
  data: updateData,
  id,
}: UpdatePlaylistInput): Promise<UpdatePlaylistOutput> {
  const { data, error, response } = await pelican.PATCH("/playlists/{id}", {
    body: {
      id: updateData.id,
      name: updateData.name,
    },
    params: { path: { id: id } },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    if (response.status === 404) throw new PlaylistNotFoundError();
    throw new PelicanError();
  }

  return { playlist: data };
}
