import { listMedia } from "../../../../lib/pelican/media/list-media";
import { MediaListWidget } from "../../../widgets/media/media-list-widget";
import { MediaListPageViewInput } from "./types";

export async function MediaListPageView({}: MediaListPageViewInput) {
  const { media } = await listMedia();

  return <MediaListWidget media={media} />;
}
