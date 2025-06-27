import { ListMediaOutput } from "../../../../../../lib/pelican/media/list-media";

export type MediaListWidgetInput = {
  media: ListMediaOutput["media"];
  onDelete?: (media: ListMediaOutput["media"]["media"][number]) => void;
  onEdit?: (media: ListMediaOutput["media"]["media"][number]) => void;
  onUpload?: () => void;
};
