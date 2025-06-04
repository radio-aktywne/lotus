import {
  ListBindingsInput,
  ListBindingsOutput,
} from "../../../../lib/pelican/bindings/list-bindings";

export type BindingListWidgetInput = {
  bindings: ListBindingsOutput["bindings"];
  where?: ListBindingsInput["where"];
};
