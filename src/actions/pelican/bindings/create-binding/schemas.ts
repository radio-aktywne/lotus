import { z } from "zod";

export const inputSchema = z.object({
  id: z.string().optional(),
  media: z.string(),
  playlist: z.string(),
  rank: z.string(),
});
