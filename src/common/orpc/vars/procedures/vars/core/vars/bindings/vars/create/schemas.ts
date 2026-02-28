import * as z from "zod";

import {
  BindingsCreateRequestSchema,
  BindingsCreateResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: z.object({
    ...BindingsCreateRequestSchema.shape.query.unwrap().shape,
    data: BindingsCreateRequestSchema.shape.body,
  }),
  Output: BindingsCreateResponseSchema,
};
