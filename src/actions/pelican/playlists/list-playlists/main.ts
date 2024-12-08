"use server";

import { PelicanError } from "../../../../lib/pelican/errors";
import { listPlaylists as internalListPlaylists } from "../../../../lib/pelican/playlists/list-playlists";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { ListPlaylistsInput, ListPlaylistsOutput } from "./types";

export async function listPlaylists(
  input: ListPlaylistsInput,
): Promise<ListPlaylistsOutput> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { playlists } = await internalListPlaylists({
      include: parsed.data.include,
      limit: parsed.data.limit,
      offset: parsed.data.offset,
      order: parsed.data.order,
      where: parsed.data.where,
    });
    return { data: playlists };
  } catch (error) {
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
