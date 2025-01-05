import { z } from "zod";

export const searchParamsSchema = z.object({
  error: z.string().optional(),
});
