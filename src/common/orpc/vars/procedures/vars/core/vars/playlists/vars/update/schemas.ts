import * as z from "zod";

import {
  PlaylistsIdUpdateRequestSchema,
  PlaylistsIdUpdateResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: z.object({
    ...PlaylistsIdUpdateRequestSchema.shape.path.shape,
    ...PlaylistsIdUpdateRequestSchema.shape.query.unwrap().shape,
    data: PlaylistsIdUpdateRequestSchema.shape.body,
  }),
  Output: PlaylistsIdUpdateResponseSchema,
};
