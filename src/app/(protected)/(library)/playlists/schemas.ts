import { z } from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  query: z.string().optional(),
});
