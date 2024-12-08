import { MessageDescriptor } from "@lingui/core";

import {
  UpdateMediaInput as InternalUpdateMediaInput,
  UpdateMediaOutput as InternalUpdateMediaOutput,
} from "../../../../lib/pelican/media/update-media";

export type UpdateMediaInput = {
  data: InternalUpdateMediaInput["data"];
  id: InternalUpdateMediaInput["id"];
};

export type UpdateMediaSuccessOutput = {
  data: InternalUpdateMediaOutput["media"];
  error?: never;
};

export type UpdateMediaErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type UpdateMediaOutput =
  | UpdateMediaErrorOutput
  | UpdateMediaSuccessOutput;
