import * as z from "zod";

import {
  BindingsIdUpdateRequestSchema,
  BindingsIdUpdateResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: z.object({
    ...BindingsIdUpdateRequestSchema.shape.path.shape,
    ...BindingsIdUpdateRequestSchema.shape.query.unwrap().shape,
    data: BindingsIdUpdateRequestSchema.shape.body,
  }),
  Output: BindingsIdUpdateResponseSchema,
};
