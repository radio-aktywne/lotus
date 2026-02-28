import * as z from "zod";

import {
  BindingsIdGetRequestSchema,
  BindingsIdGetResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: z.object({
    ...BindingsIdGetRequestSchema.shape.path.shape,
    ...BindingsIdGetRequestSchema.shape.query.unwrap().shape,
  }),
  Output: BindingsIdGetResponseSchema,
};
