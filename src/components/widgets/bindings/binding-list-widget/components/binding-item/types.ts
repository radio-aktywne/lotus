import { ListBindingsOutput } from "../../../../../../lib/pelican/bindings/list-bindings";

export type BindingItemInput = {
  binding: ListBindingsOutput["bindings"]["bindings"][number];
};
