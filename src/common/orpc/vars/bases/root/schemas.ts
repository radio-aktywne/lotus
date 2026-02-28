import * as z from "zod";

export const Schemas = {
  Errors: {
    BadRequest: z.object({
      issues: z.array(
        z.object({
          message: z.string(),
          path: z.array(z.union([z.string(), z.number()])).optional(),
        }),
      ),
    }),
  },
};
