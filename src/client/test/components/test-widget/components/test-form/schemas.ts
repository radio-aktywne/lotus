import * as z from "zod";

export const Schemas = {
  Values: z.object({
    value: z.string().min(4).max(4),
  }),
};
