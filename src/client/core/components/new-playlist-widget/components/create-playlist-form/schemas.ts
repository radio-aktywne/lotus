import * as z from "zod";

export const Schemas = {
  Input: z.object({
    name: z.codec(z.string(), z.string().optional(), {
      decode: (value) => value || undefined,
      encode: (value) => value ?? "",
    }),
  }),
  Output: z.object({
    name: z.string().pipe(z.string().min(1)),
  }),
};
