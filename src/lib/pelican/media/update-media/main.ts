import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { InvalidInputError, MediaNotFoundError } from "./errors";
import { UpdateMediaInput, UpdateMediaOutput } from "./types";

export async function updateMedia({
  data: updateData,
  id,
}: UpdateMediaInput): Promise<UpdateMediaOutput> {
  const { data, error, response } = await pelican.PATCH("/media/{id}", {
    body: {
      id: updateData.id,
      name: updateData.name,
    },
    params: { path: { id: id } },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    if (response.status === 404) throw new MediaNotFoundError();
    throw new PelicanError();
  }

  return { media: data };
}
