import { z } from "zod";

export const inputSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});
