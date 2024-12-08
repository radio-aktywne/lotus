import { MessageDescriptor } from "@lingui/core";

import {
  CreateMediaInput as InternalCreateMediaInput,
  CreateMediaOutput as InternalCreateMediaOutput,
} from "../../../../lib/pelican/media/create-media";

export type CreateMediaInput = {
  id?: InternalCreateMediaInput["id"];
  name: InternalCreateMediaInput["name"];
};

export type CreateMediaSuccessOutput = {
  data: InternalCreateMediaOutput["media"];
  error?: never;
};

export type CreateMediaErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type CreateMediaOutput =
  | CreateMediaErrorOutput
  | CreateMediaSuccessOutput;
