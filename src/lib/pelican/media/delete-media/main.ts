import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { MediaNotFoundError } from "./errors";
import { DeleteMediaInput } from "./types";

export async function deleteMedia({ id }: DeleteMediaInput): Promise<void> {
  const { error, response } = await pelican.DELETE("/media/{id}", {
    params: {
      path: { id: id },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new MediaNotFoundError();
    throw new PelicanError();
  }
}
