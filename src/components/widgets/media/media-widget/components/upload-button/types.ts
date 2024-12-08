import { GetMediaOutput } from "../../../../../../lib/pelican/media/get-media";

export type UploadButtonInput = {
  label: string;
  media: GetMediaOutput["media"];
  onUpload: (file: File | null) => Promise<void>;
};
