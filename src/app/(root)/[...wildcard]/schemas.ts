import * as z from "zod";

export const Schemas = {
  Path: z.object({
    wildcard: z.array(z.string()),
  }),
  Query: undefined as never,
};
