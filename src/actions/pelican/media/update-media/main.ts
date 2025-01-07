"use server";

import { getSession } from "../../../../lib/auth/get-session";
import { PelicanError } from "../../../../lib/pelican/errors";
import {
  updateMedia as internalUpdateMedia,
  InvalidInputError,
  MediaNotFoundError,
} from "../../../../lib/pelican/media/update-media";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { UpdateMediaInput, UpdateMediaOutput } from "./types";

export async function updateMedia(
  input: UpdateMediaInput,
): Promise<UpdateMediaOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { media } = await internalUpdateMedia({
      data: parsed.data.data,
      id: parsed.data.id,
    });
    return { data: media };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof MediaNotFoundError) return { error: errors.notFound };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
