import { MessageDescriptor } from "@lingui/core";

import {
  UpdateBindingInput as InternalUpdateBindingInput,
  UpdateBindingOutput as InternalUpdateBindingOutput,
} from "../../../../lib/pelican/bindings/update-binding";

export type UpdateBindingInput = {
  data: InternalUpdateBindingInput["data"];
  id: InternalUpdateBindingInput["id"];
};

export type UpdateBindingSuccessOutput = {
  data: InternalUpdateBindingOutput["binding"];
  error?: never;
};

export type UpdateBindingErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type UpdateBindingOutput =
  | UpdateBindingErrorOutput
  | UpdateBindingSuccessOutput;
