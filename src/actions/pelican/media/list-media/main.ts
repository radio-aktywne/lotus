"use server";

import { getSession } from "../../../../lib/auth/get-session";
import { PelicanError } from "../../../../lib/pelican/errors";
import { listMedia as internalListMedia } from "../../../../lib/pelican/media/list-media";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { ListMediaInput, ListMediaOutput } from "./types";

export async function listMedia(
  input: ListMediaInput = {},
): Promise<ListMediaOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { media } = await internalListMedia({
      include: parsed.data.include,
      limit: parsed.data.limit,
      offset: parsed.data.offset,
      order: parsed.data.order,
      where: parsed.data.where,
    });
    return { data: media };
  } catch (error) {
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
