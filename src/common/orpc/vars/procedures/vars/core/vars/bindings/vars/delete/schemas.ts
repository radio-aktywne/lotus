import {
  BindingsIdDeleteRequestSchema,
  BindingsIdDeleteResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: BindingsIdDeleteRequestSchema.shape.path,
  Output: BindingsIdDeleteResponseSchema,
};
