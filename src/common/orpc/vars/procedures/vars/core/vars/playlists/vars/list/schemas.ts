import {
  PlaylistsListRequestSchema,
  PlaylistsListResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: PlaylistsListRequestSchema.shape.query,
  Output: PlaylistsListResponseSchema,
};
