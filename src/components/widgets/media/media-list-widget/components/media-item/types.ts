import { ListMediaOutput } from "../../../../../../lib/pelican/media/list-media";

export type MediaItemInput = {
  media: ListMediaOutput["media"]["media"][number];
};
