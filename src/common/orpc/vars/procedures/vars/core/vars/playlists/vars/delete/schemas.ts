import {
  PlaylistsIdDeleteRequestSchema,
  PlaylistsIdDeleteResponseSchema,
} from "../../../../../../../../../apis/pelican/schemas";

export const Schemas = {
  Input: PlaylistsIdDeleteRequestSchema.shape.path,
  Output: PlaylistsIdDeleteResponseSchema,
};
