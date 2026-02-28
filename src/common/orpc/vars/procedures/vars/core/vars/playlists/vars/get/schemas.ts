import * as z from "zod";

import {
  PlaylistsIdGetRequestSchema,
  PlaylistsIdGetResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: z.object({
    ...PlaylistsIdGetRequestSchema.shape.path.shape,
    ...PlaylistsIdGetRequestSchema.shape.query.unwrap().shape,
  }),
  Output: PlaylistsIdGetResponseSchema,
};
