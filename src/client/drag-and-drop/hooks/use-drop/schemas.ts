import * as z from "zod";

export const Schemas = {
  Data: z.object({
    data: z.record(z.string(), z.unknown()).optional(),
    type: z.string(),
  }),
};
