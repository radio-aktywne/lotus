import {
  MediaListRequestSchema,
  MediaListResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: MediaListRequestSchema.shape.query,
  Output: MediaListResponseSchema,
};
