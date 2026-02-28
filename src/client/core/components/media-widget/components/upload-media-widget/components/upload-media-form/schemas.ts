import * as z from "zod";

export const Schemas = {
  Values: z.object({
    file: z.file().optional(),
    name: z.string().min(1),
  }),
};
