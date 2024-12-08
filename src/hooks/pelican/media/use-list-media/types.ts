import { MessageDescriptor } from "@lingui/core";

import {
  ListMediaInput,
  ListMediaOutput,
} from "../../../../lib/pelican/media/list-media";

export type UseListMediaInput = {
  include?: ListMediaInput["include"];
  interval?: number;
  limit?: ListMediaInput["limit"];
  offset?: ListMediaInput["offset"];
  order?: ListMediaInput["order"];
  where?: ListMediaInput["where"];
};

export type UseListMediaLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseListMediaErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseListMediaSuccessState = {
  data: ListMediaOutput["media"];
  error?: never;
  loading: false;
};

export type UseListMediaState =
  | UseListMediaErrorState
  | UseListMediaLoadingState
  | UseListMediaSuccessState;

export type UseListMediaOutput = {
  refresh: () => Promise<void>;
} & UseListMediaState;
