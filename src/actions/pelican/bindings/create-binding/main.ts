"use server";

import { getSession } from "../../../../lib/auth/get-session";
import {
  createBinding as internalCreateBinding,
  InvalidInputError,
} from "../../../../lib/pelican/bindings/create-binding";
import { PelicanError } from "../../../../lib/pelican/errors";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { CreateBindingInput, CreateBindingOutput } from "./types";

export async function createBinding(
  input: CreateBindingInput,
): Promise<CreateBindingOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { binding } = await internalCreateBinding({
      id: parsed.data.id,
      media: parsed.data.media,
      playlist: parsed.data.playlist,
      rank: parsed.data.rank,
    });
    return { data: binding };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
