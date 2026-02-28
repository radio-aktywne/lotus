import * as z from "zod";

export const Schemas = {
  Path: undefined as never,
  Query: z.object({
    page: z.coerce.number().int().positive().default(1),
    query: z.string().optional(),
  }),
};
