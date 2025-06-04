import { listPlaylists } from "../../../../lib/pelican/playlists/list-playlists";
import { PlaylistListWidget } from "../../../widgets/playlists/playlist-list-widget";
import { PlaylistListPageViewInput } from "./types";

export async function PlaylistListPageView({}: PlaylistListPageViewInput) {
  const { playlists } = await listPlaylists();

  return <PlaylistListWidget playlists={playlists} />;
}
