import { GetMediaOutput } from "../../../../../../lib/pelican/media/get-media";

export type DownloadButtonInput = {
  label: string;
  media: GetMediaOutput["media"];
};
