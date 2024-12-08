import { components } from "../../../../services/pelican";

export type CreateBindingInput = {
  id?: string;
  media: string;
  playlist: string;
  rank: string;
};

export type CreateBindingOutput = {
  binding: components["schemas"]["bindings_models_Binding"];
};
