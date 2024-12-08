import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { PlaylistNotFoundError } from "./errors";
import { DeletePlaylistInput } from "./types";

export async function deletePlaylist({
  id,
}: DeletePlaylistInput): Promise<void> {
  const { error, response } = await pelican.DELETE("/playlists/{id}", {
    params: {
      path: { id: id },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new PlaylistNotFoundError();
    throw new PelicanError();
  }
}
