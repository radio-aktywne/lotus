import { components } from "../../../../services/pelican";

export type ListMediaInput = {
  include?: string;
  limit?: number;
  offset?: number;
  order?: string;
  where?: string;
};

export type ListMediaOutput = {
  media: components["schemas"]["MediaList"];
};
