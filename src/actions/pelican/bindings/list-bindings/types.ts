import { MessageDescriptor } from "@lingui/core";

import {
  ListBindingsInput as InternalListBindingsInput,
  ListBindingsOutput as InternalListBindingsOutput,
} from "../../../../lib/pelican/bindings/list-bindings";

export type ListBindingsInput = {
  include?: InternalListBindingsInput["include"];
  limit?: InternalListBindingsInput["limit"];
  offset?: InternalListBindingsInput["offset"];
  order?: InternalListBindingsInput["order"];
  where?: InternalListBindingsInput["where"];
};

export type ListBindingsSuccessOutput = {
  data: InternalListBindingsOutput["bindings"];
  error?: never;
};

export type ListBindingsErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ListBindingsOutput =
  | ListBindingsErrorOutput
  | ListBindingsSuccessOutput;
