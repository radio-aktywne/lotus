import { components } from "../../../../services/pelican";

export type UpdateMediaInput = {
  data: {
    id?: string;
    name?: string;
  };
  id: string;
};

export type UpdateMediaOutput = {
  media: components["schemas"]["media_models_Media"];
};
