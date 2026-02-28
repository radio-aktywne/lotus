import * as z from "zod";

import {
  MediaCreateRequestSchema,
  MediaCreateResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: z.object({
    ...MediaCreateRequestSchema.shape.query.unwrap().shape,
    data: MediaCreateRequestSchema.shape.body,
  }),
  Output: MediaCreateResponseSchema,
};
