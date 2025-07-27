import { ListMediaOutput } from "../../../../../../../../lib/pelican/media/list-media";

export type MediaItemInput = {
  index: number;
  media: ListMediaOutput["media"]["media"][number];
  onDelete?: () => void;
  onEdit?: () => void;
};
