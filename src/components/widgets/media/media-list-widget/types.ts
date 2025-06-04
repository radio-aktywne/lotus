import {
  ListMediaInput,
  ListMediaOutput,
} from "../../../../lib/pelican/media/list-media";

export type MediaListWidgetInput = {
  media: ListMediaOutput["media"];
  where?: ListMediaInput["where"];
};
