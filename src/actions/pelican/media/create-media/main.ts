"use server";

import { PelicanError } from "../../../../lib/pelican/errors";
import {
  createMedia as internalCreateMedia,
  InvalidInputError,
} from "../../../../lib/pelican/media/create-media";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { CreateMediaInput, CreateMediaOutput } from "./types";

export async function createMedia(
  input: CreateMediaInput,
): Promise<CreateMediaOutput> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { media } = await internalCreateMedia({
      id: parsed.data.id,
      name: parsed.data.name,
    });
    return { data: media };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
