import * as z from "zod";

export const IdentitySchemas = {
  User: z.object({
    id: z.coerce.string().nonempty(),
    traits: z.object({
      locales: z
        .object({
          preferred: z.coerce.string().nonempty().optional().catch(undefined),
        })
        .optional()
        .catch(undefined),
      names: z.object({
        display: z.coerce.string().nonempty(),
      }),
      pictures: z
        .object({
          profile: z
            .object({
              url: z.url().optional().catch(undefined),
            })
            .optional()
            .catch(undefined),
        })
        .optional()
        .catch(undefined),
    }),
  }),
};
