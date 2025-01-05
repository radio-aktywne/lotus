"use server";

import { auth } from "../../../../auth";
import { PelicanError } from "../../../../lib/pelican/errors";
import {
  updatePlaylist as internalUpdatePlaylist,
  InvalidInputError,
  PlaylistNotFoundError,
} from "../../../../lib/pelican/playlists/update-playlist";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { UpdatePlaylistInput, UpdatePlaylistOutput } from "./types";

export async function updatePlaylist(
  input: UpdatePlaylistInput,
): Promise<UpdatePlaylistOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { playlist } = await internalUpdatePlaylist({
      data: parsed.data.data,
      id: parsed.data.id,
    });
    return { data: playlist };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof PlaylistNotFoundError)
      return { error: errors.notFound };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
