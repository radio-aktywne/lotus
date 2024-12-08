import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { BindingNotFoundError, InvalidInputError } from "./errors";
import { UpdateBindingInput, UpdateBindingOutput } from "./types";

export async function updateBinding({
  data: updateData,
  id,
}: UpdateBindingInput): Promise<UpdateBindingOutput> {
  const { data, error, response } = await pelican.PATCH("/bindings/{id}", {
    body: {
      id: updateData.id,
      mediaId: updateData.media,
      playlistId: updateData.playlist,
      rank: updateData.rank,
    },
    params: { path: { id: id } },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    if (response.status === 404) throw new BindingNotFoundError();
    throw new PelicanError();
  }

  return { binding: data };
}
