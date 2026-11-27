import * as z from "zod";

export const Schemas = {
  Input: z.object({
    value: z.codec(z.string(), z.string().optional(), {
      decode: (value) => value || undefined,
      encode: (value) => value ?? "",
    }),
  }),
  Output: z.object({
    value: z.string().pipe(z.string().nonempty().min(4).max(4)),
  }),
};
