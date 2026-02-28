import * as z from "zod";

export const Schemas = {
  Values: z.object({
    name: z.string().min(1),
  }),
};
