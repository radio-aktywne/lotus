"use server";

import { getSession } from "../../../../lib/auth/get-session";
import { PelicanError } from "../../../../lib/pelican/errors";
import {
  deletePlaylist as internalDeletePlaylist,
  PlaylistNotFoundError,
} from "../../../../lib/pelican/playlists/delete-playlist";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { DeletePlaylistInput, DeletePlaylistOutput } from "./types";

export async function deletePlaylist(
  input: DeletePlaylistInput,
): Promise<DeletePlaylistOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    await internalDeletePlaylist({ id: parsed.data.id });
    return {};
  } catch (error) {
    if (error instanceof PlaylistNotFoundError)
      return { error: errors.notFound };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
