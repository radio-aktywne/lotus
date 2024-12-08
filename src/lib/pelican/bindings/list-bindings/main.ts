import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { ListBindingsInput, ListBindingsOutput } from "./types";

export async function listBindings({
  include,
  limit,
  offset,
  order,
  where,
}: ListBindingsInput): Promise<ListBindingsOutput> {
  const { data, error, response } = await pelican.GET("/bindings", {
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

  return { bindings: data };
}
