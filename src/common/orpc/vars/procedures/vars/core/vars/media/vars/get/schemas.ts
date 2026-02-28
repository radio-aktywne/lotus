import * as z from "zod";

import {
  MediaIdGetRequestSchema,
  MediaIdGetResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: z.object({
    ...MediaIdGetRequestSchema.shape.path.shape,
    ...MediaIdGetRequestSchema.shape.query.unwrap().shape,
  }),
  Output: MediaIdGetResponseSchema,
};
