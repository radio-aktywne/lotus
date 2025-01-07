"use server";

import { getSession } from "../../../../lib/auth/get-session";
import { PelicanError } from "../../../../lib/pelican/errors";
import {
  deleteMedia as internalDeleteMedia,
  MediaNotFoundError,
} from "../../../../lib/pelican/media/delete-media";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { DeleteMediaInput, DeleteMediaOutput } from "./types";

export async function deleteMedia(
  input: DeleteMediaInput,
): Promise<DeleteMediaOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    await internalDeleteMedia({ id: parsed.data.id });
    return {};
  } catch (error) {
    if (error instanceof MediaNotFoundError) return { error: errors.notFound };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
