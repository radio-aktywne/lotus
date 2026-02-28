import * as z from "zod";

import {
  MediaIdUpdateRequestSchema,
  MediaIdUpdateResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: z.object({
    ...MediaIdUpdateRequestSchema.shape.path.shape,
    ...MediaIdUpdateRequestSchema.shape.query.unwrap().shape,
    data: MediaIdUpdateRequestSchema.shape.body,
  }),
  Output: MediaIdUpdateResponseSchema,
};
