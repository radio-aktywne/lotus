"use server";

import { getSession } from "../../../../lib/auth/get-session";
import { PelicanError } from "../../../../lib/pelican/errors";
import {
  getMedia as internalGetMedia,
  MediaNotFoundError,
} from "../../../../lib/pelican/media/get-media";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { GetMediaInput, GetMediaOutput } from "./types";

export async function getMedia(input: GetMediaInput): Promise<GetMediaOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { media } = await internalGetMedia({
      id: parsed.data.id,
      include: parsed.data.include,
    });
    return { data: media };
  } catch (error) {
    if (error instanceof MediaNotFoundError) return { error: errors.notFound };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
