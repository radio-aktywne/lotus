import { MessageDescriptor } from "@lingui/core";

import {
  GetMediaInput,
  GetMediaOutput,
} from "../../../../lib/pelican/media/get-media";

export type UseGetMediaInput = {
  id: GetMediaInput["id"];
  include?: GetMediaInput["include"];
  interval?: number;
};

export type UseGetMediaLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseGetMediaErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseGetMediaSuccessState = {
  data: GetMediaOutput["media"];
  error?: never;
  loading: false;
};

export type UseGetMediaState =
  | UseGetMediaErrorState
  | UseGetMediaLoadingState
  | UseGetMediaSuccessState;

export type UseGetMediaOutput = {
  refresh: () => Promise<void>;
} & UseGetMediaState;
