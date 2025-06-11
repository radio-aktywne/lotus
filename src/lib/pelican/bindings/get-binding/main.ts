import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { BindingNotFoundError } from "./errors";
import { GetBindingInput, GetBindingOutput } from "./types";

export async function getBinding({
  id,
  include,
}: GetBindingInput): Promise<GetBindingOutput> {
  const { data, error, response } = await pelican.GET("/bindings/{id}", {
    cache: "no-store",
    params: {
      path: { id: id },
      query: { include: include },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new BindingNotFoundError();
    throw new PelicanError();
  }

  return { binding: data };
}
