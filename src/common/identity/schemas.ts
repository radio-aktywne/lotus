import * as z from "zod";

export const IdentitySchemas = {
  User: z.object({
    id: z.string(),
    traits: z.object({
      locales: z
        .object({
          preferred: z.string().optional(),
        })
        .optional(),
      names: z.object({
        display: z.string(),
      }),
      pictures: z
        .object({
          profile: z
            .object({
              url: z.url().optional(),
            })
            .optional(),
        })
        .optional(),
    }),
  }),
};
