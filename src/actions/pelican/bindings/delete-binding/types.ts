import { MessageDescriptor } from "@lingui/core";

import { DeleteBindingInput as InternalDeleteBindingInput } from "../../../../lib/pelican/bindings/delete-binding";

export type DeleteBindingInput = {
  id: InternalDeleteBindingInput["id"];
};

export type DeleteBindingSuccessOutput = {
  error?: never;
};

export type DeleteBindingErrorOutput = {
  error: MessageDescriptor;
};

export type DeleteBindingOutput =
  | DeleteBindingErrorOutput
  | DeleteBindingSuccessOutput;
