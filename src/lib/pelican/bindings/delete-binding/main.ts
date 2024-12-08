import "server-only";

import { pelican } from "../../../../services/pelican";
import { PelicanError } from "../../errors";
import { BindingNotFoundError } from "./errors";
import { DeleteBindingInput } from "./types";

export async function deleteBinding({ id }: DeleteBindingInput): Promise<void> {
  const { error, response } = await pelican.DELETE("/bindings/{id}", {
    params: {
      path: { id: id },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new BindingNotFoundError();
    throw new PelicanError();
  }
}
