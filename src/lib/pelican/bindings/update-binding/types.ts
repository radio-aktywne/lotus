import { components } from "../../../../services/pelican";

export type UpdateBindingInput = {
  data: {
    id?: string;
    media?: string;
    playlist?: string;
    rank?: string;
  };
  id: string;
};

export type UpdateBindingOutput = {
  binding: components["schemas"]["bindings_models_Binding"];
};
