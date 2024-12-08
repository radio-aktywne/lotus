import { MessageDescriptor } from "@lingui/core";

import {
  GetBindingInput as InternalGetBindingInput,
  GetBindingOutput as InternalGetBindingOutput,
} from "../../../../lib/pelican/bindings/get-binding";

export type GetBindingInput = {
  id: InternalGetBindingInput["id"];
  include?: InternalGetBindingInput["include"];
};

export type GetBindingSuccessOutput = {
  data: InternalGetBindingOutput["binding"];
  error?: never;
};

export type GetBindingErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type GetBindingOutput = GetBindingErrorOutput | GetBindingSuccessOutput;
