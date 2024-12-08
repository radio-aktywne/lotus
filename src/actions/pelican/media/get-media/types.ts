import { MessageDescriptor } from "@lingui/core";

import {
  GetMediaInput as InternalGetMediaInput,
  GetMediaOutput as InternalGetMediaOutput,
} from "../../../../lib/pelican/media/get-media";

export type GetMediaInput = {
  id: InternalGetMediaInput["id"];
  include?: InternalGetMediaInput["include"];
};

export type GetMediaSuccessOutput = {
  data: InternalGetMediaOutput["media"];
  error?: never;
};

export type GetMediaErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type GetMediaOutput = GetMediaErrorOutput | GetMediaSuccessOutput;
