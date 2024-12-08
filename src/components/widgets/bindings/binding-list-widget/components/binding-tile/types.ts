import { ListBindingsOutput } from "../../../../../../lib/pelican/bindings/list-bindings";

export type BindingTileInput = {
  binding: ListBindingsOutput["bindings"]["bindings"][number];
};
