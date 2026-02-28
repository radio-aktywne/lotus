import type { MediaModelsMedia } from "../../../../../../common/apis/pelican/types";

export type DisplayMediaWidgetInput = {
  limit: number;
  media: Omit<MediaModelsMedia, "bindings">[];
  onDelete?: (id: string) => Promise<unknown>;
  onEdit?: (id: string) => void;
  onPageChange?: (page: number) => void;
  onQueryChange?: (query: string) => void;
  onUpload?: () => void;
  page: number;
  query?: string;
  total: number;
};
