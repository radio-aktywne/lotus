"use server";

import { getSession } from "../../../../lib/auth/get-session";
import {
  BindingNotFoundError,
  updateBinding as internalUpdateBinding,
  InvalidInputError,
} from "../../../../lib/pelican/bindings/update-binding";
import { PelicanError } from "../../../../lib/pelican/errors";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { UpdateBindingInput, UpdateBindingOutput } from "./types";

export async function updateBinding(
  input: UpdateBindingInput,
): Promise<UpdateBindingOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { binding } = await internalUpdateBinding({
      data: parsed.data.data,
      id: parsed.data.id,
    });
    return { data: binding };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof BindingNotFoundError)
      return { error: errors.notFound };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
