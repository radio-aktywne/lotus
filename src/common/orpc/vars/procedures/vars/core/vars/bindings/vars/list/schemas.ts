import {
  BindingsListRequestSchema,
  BindingsListResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: BindingsListRequestSchema.shape.query,
  Output: BindingsListResponseSchema,
};
