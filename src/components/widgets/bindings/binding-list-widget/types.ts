import {
  ListBindingsInput,
  ListBindingsOutput,
} from "../../../../lib/pelican/bindings/list-bindings";

export type BindingListWidgetInput = {
  bindings: ListBindingsOutput["bindings"];
  perPage?: number;
  where?: ListBindingsInput["where"];
};
