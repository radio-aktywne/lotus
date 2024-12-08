import { MessageDescriptor } from "@lingui/core";

import {
  ListBindingsInput,
  ListBindingsOutput,
} from "../../../../lib/pelican/bindings/list-bindings";

export type UseListBindingsInput = {
  include?: ListBindingsInput["include"];
  interval?: number;
  limit?: ListBindingsInput["limit"];
  offset?: ListBindingsInput["offset"];
  order?: ListBindingsInput["order"];
  where?: ListBindingsInput["where"];
};

export type UseListBindingsLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseListBindingsErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseListBindingsSuccessState = {
  data: ListBindingsOutput["bindings"];
  error?: never;
  loading: false;
};

export type UseListBindingsState =
  | UseListBindingsErrorState
  | UseListBindingsLoadingState
  | UseListBindingsSuccessState;

export type UseListBindingsOutput = {
  refresh: () => Promise<void>;
} & UseListBindingsState;
