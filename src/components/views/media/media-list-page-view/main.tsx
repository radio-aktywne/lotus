import { listMedia } from "../../../../lib/pelican/media/list-media";
import { MediaListWidget } from "../../../widgets/media/media-list-widget";
import { perPage } from "./constants";
import { MediaListPageViewInput } from "./types";

export async function MediaListPageView({}: MediaListPageViewInput) {
  const { media } = await listMedia({ limit: perPage });

  return <MediaListWidget media={media} perPage={perPage} />;
}
