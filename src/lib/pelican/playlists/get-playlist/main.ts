import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { PlaylistNotFoundError } from "./errors";
import { GetPlaylistInput, GetPlaylistOutput } from "./types";

export async function getPlaylist({
  id,
  include,
}: GetPlaylistInput): Promise<GetPlaylistOutput> {
  const { data, error, response } = await pelican.GET("/playlists/{id}", {
    params: {
      path: { id: id },
      query: { include: include },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new PlaylistNotFoundError();
    throw new PelicanError();
  }

  return { playlist: data };
}
