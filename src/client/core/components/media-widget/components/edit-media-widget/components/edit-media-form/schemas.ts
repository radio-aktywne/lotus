import * as z from "zod";

export const Schemas = {
  Input: z.object({
    name: z.string().pipe(z.string().min(1)),
  }),
  Output: z.object({
    name: z.string().pipe(z.string().min(1)),
  }),
};
