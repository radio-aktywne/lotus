import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { MediaNotFoundError } from "./errors";
import { GetMediaInput, GetMediaOutput } from "./types";

export async function getMedia({
  id,
  include,
}: GetMediaInput): Promise<GetMediaOutput> {
  const { data, error, response } = await pelican.GET("/media/{id}", {
    params: {
      path: { id: id },
      query: { include: include },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new MediaNotFoundError();
    throw new PelicanError();
  }

  return { media: data };
}
