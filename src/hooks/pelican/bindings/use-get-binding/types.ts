import { MessageDescriptor } from "@lingui/core";

import {
  GetBindingInput,
  GetBindingOutput,
} from "../../../../lib/pelican/bindings/get-binding";

export type UseGetBindingInput = {
  id: GetBindingInput["id"];
  include?: GetBindingInput["include"];
  interval?: number;
};

export type UseGetBindingLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseGetBindingErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseGetBindingSuccessState = {
  data: GetBindingOutput["binding"];
  error?: never;
  loading: false;
};

export type UseGetBindingState =
  | UseGetBindingErrorState
  | UseGetBindingLoadingState
  | UseGetBindingSuccessState;

export type UseGetBindingOutput = {
  refresh: () => Promise<void>;
} & UseGetBindingState;
