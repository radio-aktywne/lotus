import {
  MediaIdDeleteRequestSchema,
  MediaIdDeleteResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: MediaIdDeleteRequestSchema.shape.path,
  Output: MediaIdDeleteResponseSchema,
};
