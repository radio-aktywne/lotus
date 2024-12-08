import { MessageDescriptor } from "@lingui/core";

import {
  ListMediaInput as InternalListMediaInput,
  ListMediaOutput as InternalListMediaOutput,
} from "../../../../lib/pelican/media/list-media";

export type ListMediaInput = {
  include?: InternalListMediaInput["include"];
  limit?: InternalListMediaInput["limit"];
  offset?: InternalListMediaInput["offset"];
  order?: InternalListMediaInput["order"];
  where?: InternalListMediaInput["where"];
};

export type ListMediaSuccessOutput = {
  data: InternalListMediaOutput["media"];
  error?: never;
};

export type ListMediaErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ListMediaOutput = ListMediaErrorOutput | ListMediaSuccessOutput;
