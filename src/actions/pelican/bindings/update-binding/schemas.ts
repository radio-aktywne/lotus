import { z } from "zod";

export const inputSchema = z.object({
  data: z.object({
    id: z.string().optional(),
    media: z.string().optional(),
    playlist: z.string().optional(),
    rank: z.string().optional(),
  }),
  id: z.string(),
});
