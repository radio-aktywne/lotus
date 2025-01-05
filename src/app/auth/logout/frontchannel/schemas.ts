import { z } from "zod";

export const searchParamsSchema = z.object({
  iss: z.string(),
  sid: z.string(),
});
