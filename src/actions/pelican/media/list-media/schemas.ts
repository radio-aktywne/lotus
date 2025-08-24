import { z } from "zod";

export const inputSchema = z.object({
  include: z.string().nullable().optional(),
  limit: z.number().nullable().optional(),
  offset: z.number().nullable().optional(),
  order: z.string().nullable().optional(),
  where: z.string().nullable().optional(),
});
