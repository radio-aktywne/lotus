import { MediaNotFoundMetadata } from "../../../../components/metadata/media/media/media-not-found-metadata";
import { MediaNotFoundView } from "../../../../components/views/media/media/media-not-found-view";
import { MediaNotFoundInput } from "./types";

export const dynamic = "force-dynamic";

export default function MediaNotFound({}: MediaNotFoundInput) {
  return (
    <>
      <MediaNotFoundMetadata />
      <MediaNotFoundView />
    </>
  );
}
