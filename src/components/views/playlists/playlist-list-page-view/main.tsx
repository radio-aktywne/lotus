import { listPlaylists } from "../../../../lib/pelican/playlists/list-playlists";
import { PlaylistListWidget } from "../../../widgets/playlists/playlist-list-widget";
import { perPage } from "./constants";
import { PlaylistListPageViewInput } from "./types";

export async function PlaylistListPageView({}: PlaylistListPageViewInput) {
  const { playlists } = await listPlaylists({ limit: perPage });

  return <PlaylistListWidget perPage={perPage} playlists={playlists} />;
}
