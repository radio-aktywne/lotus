import * as z from "zod";

import {
  PlaylistsCreateRequestSchema,
  PlaylistsCreateResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: z.object({
    ...PlaylistsCreateRequestSchema.shape.query.unwrap().shape,
    data: PlaylistsCreateRequestSchema.shape.body,
  }),
  Output: PlaylistsCreateResponseSchema,
};
