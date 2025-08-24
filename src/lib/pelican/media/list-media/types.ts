import { components } from "../../../../services/pelican";

export type ListMediaInput = {
  include?: null | string;
  limit?: null | number;
  offset?: null | number;
  order?: null | string;
  where?: null | string;
};

export type ListMediaOutput = {
  media: components["schemas"]["MediaList"];
};
