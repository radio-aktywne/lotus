import * as z from "zod";

export const Schemas = {
  Path: z.object({
    id: z.uuidv4(),
  }),
  Query: undefined as never,
};
