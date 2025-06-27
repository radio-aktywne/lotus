import slugify from "slugify";

import { MediaItemInput } from "./types";

export function formatDisplayName(media: MediaItemInput["media"]) {
  return media.name;
}

export function formatFilename(media: MediaItemInput["media"]) {
  return slugify(media.name);
}
