"use server";

import { auth } from "../../../../../auth";
import { PelicanError } from "../../../../../lib/pelican/errors";
import {
  headMediaContent as internalHeadMediaContent,
  MediaNotFoundError,
} from "../../../../../lib/pelican/media/content/head-media-content";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { HeadMediaContentInput, HeadMediaContentOutput } from "./types";

export async function headMediaContent(
  input: HeadMediaContentInput,
): Promise<HeadMediaContentOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { etag, length, modified, type } = await internalHeadMediaContent({
      id: parsed.data.id,
    });
    return { etag: etag, length: length, modified: modified, type: type };
  } catch (error) {
    if (error instanceof MediaNotFoundError) return { error: errors.notFound };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
