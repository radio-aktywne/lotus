import { components } from "../../../../services/pelican";

export type GetMediaInput = {
  id: string;
  include?: string;
};

export type GetMediaOutput = {
  media: components["schemas"]["media_models_Media"];
};
