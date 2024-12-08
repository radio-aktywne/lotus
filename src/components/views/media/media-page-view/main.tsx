import { notFound } from "next/navigation";

import {
  getMedia,
  MediaNotFoundError,
} from "../../../../lib/pelican/media/get-media";
import { MediaWidget } from "../../../widgets/media/media-widget";
import { MediaPageViewInput } from "./types";

export async function MediaPageView({ id }: MediaPageViewInput) {
  try {
    const { media } = await getMedia({ id: id });

    return <MediaWidget media={media} />;
  } catch (error) {
    if (error instanceof MediaNotFoundError) notFound();
    throw error;
  }
}
