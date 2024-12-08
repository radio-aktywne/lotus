import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { InvalidInputError } from "./errors";
import { CreateMediaInput, CreateMediaOutput } from "./types";

export async function createMedia({
  id,
  name,
}: CreateMediaInput): Promise<CreateMediaOutput> {
  const { data, error, response } = await pelican.POST("/media", {
    body: {
      id: id,
      name: name,
    },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    throw new PelicanError();
  }

  return { media: data };
}
