import { z } from "zod";

export const inputSchema = z.object({
  include: z.string().optional(),
  limit: z.number().int().optional(),
  offset: z.number().int().optional(),
  order: z.string().optional(),
  where: z.string().optional(),
});
