import { PlaylistNotFoundMetadata } from "../../../../components/metadata/playlists/playlist/playlist-not-found-metadata";
import { PlaylistNotFoundView } from "../../../../components/views/playlists/playlist/playlist-not-found-view";
import { PlaylistNotFoundInput } from "./types";

export const dynamic = "force-dynamic";

export default function PlaylistNotFound({}: PlaylistNotFoundInput) {
  return (
    <>
      <PlaylistNotFoundMetadata />
      <PlaylistNotFoundView />
    </>
  );
}
