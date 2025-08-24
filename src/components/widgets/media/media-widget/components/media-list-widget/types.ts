import { ListMediaOutput } from "../../../../../../lib/pelican/media/list-media";

export type MediaListWidgetInput = {
  media?: ListMediaOutput["media"];
  onDelete?: (media: ListMediaOutput["media"]["media"][number]) => void;
  onEdit?: (media: ListMediaOutput["media"]["media"][number]) => void;
  onPageChange?: (page: number) => void;
  onQueryChange?: (query: string) => void;
  onUpload?: () => void;
  page?: number;
  perPage: number;
  query?: string;
};
