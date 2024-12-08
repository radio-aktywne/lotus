import { ListMediaOutput } from "../../../../../../lib/pelican/media/list-media";

export type MediaTileInput = {
  media: ListMediaOutput["media"]["media"][number];
};
