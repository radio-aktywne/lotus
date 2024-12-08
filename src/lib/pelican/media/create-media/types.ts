import { components } from "../../../../services/pelican";

export type CreateMediaInput = {
  id?: string;
  name: string;
};

export type CreateMediaOutput = {
  media: components["schemas"]["media_models_Media"];
};
