import { MessageDescriptor } from "@lingui/core";

import { DeleteMediaInput as InternalDeleteMediaInput } from "../../../../lib/pelican/media/delete-media";

export type DeleteMediaInput = {
  id: InternalDeleteMediaInput["id"];
};

export type DeleteMediaSuccessOutput = {
  error?: never;
};

export type DeleteMediaErrorOutput = {
  error: MessageDescriptor;
};

export type DeleteMediaOutput =
  | DeleteMediaErrorOutput
  | DeleteMediaSuccessOutput;
