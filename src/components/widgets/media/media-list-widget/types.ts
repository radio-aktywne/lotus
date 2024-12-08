import {
  ListMediaInput,
  ListMediaOutput,
} from "../../../../lib/pelican/media/list-media";

export type MediaListWidgetInput = {
  media: ListMediaOutput["media"];
  perPage?: number;
  where?: ListMediaInput["where"];
};
