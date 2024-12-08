import { components } from "../../../../services/pelican";

export type ListBindingsInput = {
  include?: string;
  limit?: number;
  offset?: number;
  order?: string;
  where?: string;
};

export type ListBindingsOutput = {
  bindings: components["schemas"]["BindingList"];
};
