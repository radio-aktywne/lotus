"use server";

import { auth } from "../../../../auth";
import { PelicanError } from "../../../../lib/pelican/errors";
import {
  createPlaylist as internalCreatePlaylist,
  InvalidInputError,
} from "../../../../lib/pelican/playlists/create-playlist";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { CreatePlaylistInput, CreatePlaylistOutput } from "./types";

export async function createPlaylist(
  input: CreatePlaylistInput,
): Promise<CreatePlaylistOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { playlist } = await internalCreatePlaylist({
      id: parsed.data.id,
      name: parsed.data.name,
    });
    return { data: playlist };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
