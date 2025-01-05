"use server";

import { auth } from "../../../../auth";
import { PelicanError } from "../../../../lib/pelican/errors";
import {
  getPlaylist as internalGetPlaylist,
  PlaylistNotFoundError,
} from "../../../../lib/pelican/playlists/get-playlist";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { GetPlaylistInput, GetPlaylistOutput } from "./types";

export async function getPlaylist(
  input: GetPlaylistInput,
): Promise<GetPlaylistOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { playlist } = await internalGetPlaylist({
      id: parsed.data.id,
      include: parsed.data.include,
    });
    return { data: playlist };
  } catch (error) {
    if (error instanceof PlaylistNotFoundError)
      return { error: errors.notFound };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
