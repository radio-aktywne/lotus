import { PlaylistItemInput } from "./types";

export function formatDisplayName(playlist: PlaylistItemInput["playlist"]) {
  return playlist.name;
}
