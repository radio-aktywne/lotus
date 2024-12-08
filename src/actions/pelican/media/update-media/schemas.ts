import { z } from "zod";

export const inputSchema = z.object({
  data: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
  }),
  id: z.string(),
});
