import { PlaylistNotFoundMetadata } from "../../../../components/metadata/playlists/playlist/playlist-not-found-metadata";
import { PlaylistNotFoundView } from "../../../../components/views/playlists/playlist/playlist-not-found-view";
import { PlaylistNotFoundInput } from "./types";

export default function PlaylistNotFound({}: PlaylistNotFoundInput) {
  return (
    <>
      <PlaylistNotFoundMetadata />
      <PlaylistNotFoundView />
    </>
  );
}
