import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { ListMediaInput, ListMediaOutput } from "./types";

export async function listMedia({
  include,
  limit,
  offset,
  order,
  where,
}: ListMediaInput): Promise<ListMediaOutput> {
  const { data, error, response } = await pelican.GET("/media", {
    params: {
      query: {
        include: include,
        limit: limit,
        offset: offset,
        order: order,
        where: where,
      },
    },
  });

  if (error || !response.ok) throw new PelicanError();

  return { media: data };
}
