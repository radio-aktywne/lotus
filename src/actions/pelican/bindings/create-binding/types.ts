import { MessageDescriptor } from "@lingui/core";

import {
  CreateBindingInput as InternalCreateBindingInput,
  CreateBindingOutput as InternalCreateBindingOutput,
} from "../../../../lib/pelican/bindings/create-binding";

export type CreateBindingInput = {
  id?: InternalCreateBindingInput["id"];
  media: InternalCreateBindingInput["media"];
  playlist: InternalCreateBindingInput["playlist"];
  rank: InternalCreateBindingInput["rank"];
};

export type CreateBindingSuccessOutput = {
  data: InternalCreateBindingOutput["binding"];
  error?: never;
};

export type CreateBindingErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type CreateBindingOutput =
  | CreateBindingErrorOutput
  | CreateBindingSuccessOutput;
