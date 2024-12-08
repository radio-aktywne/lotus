import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { InvalidInputError } from "./errors";
import { CreateBindingInput, CreateBindingOutput } from "./types";

export async function createBinding({
  id,
  media,
  playlist,
  rank,
}: CreateBindingInput): Promise<CreateBindingOutput> {
  const { data, error, response } = await pelican.POST("/bindings", {
    body: {
      id: id,
      mediaId: media,
      playlistId: playlist,
      rank: rank,
    },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    throw new PelicanError();
  }

  return { binding: data };
}
