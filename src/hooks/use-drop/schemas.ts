import { z } from "zod";

export const dataSchema = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
  type: z.string(),
});
