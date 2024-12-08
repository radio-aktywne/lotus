import { z } from "zod";

export const inputSchema = z.object({
  id: z.string(),
  include: z.string().optional(),
});
