import { PlaylistWidgetInput } from "./types";

export function formatDisplayName(playlist: PlaylistWidgetInput["playlist"]) {
  return playlist.name;
}
