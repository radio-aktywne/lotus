import { components } from "../../../../services/pelican";

export type GetBindingInput = {
  id: string;
  include?: string;
};

export type GetBindingOutput = {
  binding: components["schemas"]["bindings_models_Binding"];
};
