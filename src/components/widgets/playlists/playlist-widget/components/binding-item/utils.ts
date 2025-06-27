import slugify from "slugify";

import { BindingItemInput } from "./types";

export function formatDisplayName(binding: BindingItemInput["binding"]) {
  return binding.media!.name;
}

export function formatFilename(binding: BindingItemInput["binding"]) {
  return slugify(binding.media!.name);
}
