import { MediaNotFoundMetadata } from "../../../components/metadata/media/media-not-found-metadata";
import { MediaNotFoundView } from "../../../components/views/media/media-not-found-view";
import { MediaNotFoundInput } from "./types";

export default function MediaNotFound({}: MediaNotFoundInput) {
  return (
    <>
      <MediaNotFoundMetadata />
      <MediaNotFoundView />
    </>
  );
}
