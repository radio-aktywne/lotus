import type { OmitDeep, SetNonNullable } from "type-fest";

import type { BindingsModelsBinding } from "../../../../../../common/apis/pelican/types";

export type BindingItemInput = {
  binding: OmitDeep<
    SetNonNullable<BindingsModelsBinding, "media" | "playlist">,
    "media.bindings" | "playlist.bindings"
  >;
  index: number;
  onDelete?: () => Promise<unknown>;
  position: number;
  total: number;
};
