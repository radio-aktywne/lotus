import { PlaylistNotFoundMetadata } from "../../../../components/metadata/playlists/playlist-not-found-metadata";
import { PlaylistNotFoundView } from "../../../../components/views/playlists/playlist-not-found-view";
import { PlaylistNotFoundInput } from "./types";

export default function PlaylistNotFound({}: PlaylistNotFoundInput) {
  return (
    <>
      <PlaylistNotFoundMetadata />
      <PlaylistNotFoundView />
    </>
  );
}
