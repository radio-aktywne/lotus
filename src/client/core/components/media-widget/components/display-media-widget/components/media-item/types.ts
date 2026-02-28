import type { MediaModelsMedia } from "../../../../../../../../common/apis/pelican/types";

export type MediaItemInput = {
  index: number;
  media: Omit<MediaModelsMedia, "bindings">;
  onDelete?: () => Promise<unknown>;
  onEdit?: () => void;
};
