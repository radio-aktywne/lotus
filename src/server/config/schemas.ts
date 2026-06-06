import "server-only";
import * as z from "zod";

export const ConfigSchemas = {
  Config: z
    .object({
      apis: z
        .object({
          icanhazdadjoke: z
            .object({
              host: z.string().default("icanhazdadjoke.com"),
              path: z.string().nullish(),
              port: z.coerce.number().min(0).max(65535).nullish(),
              scheme: z.string().default("https"),
            })
            .prefault({}),
          pelican: z
            .object({
              host: z.string().default("localhost"),
              path: z.string().nullish(),
              port: z.coerce
                .number()
                .min(0)
                .max(65535)
                .nullish()
                .default(10200),
              scheme: z.string().default("http"),
            })
            .prefault({}),
        })
        .prefault({}),
      debug: z.stringbool().default(true),
      identity: z
        .object({
          users: z
            .object({
              debug: z
                .object({
                  id: z.string().default("debug"),
                  traits: z
                    .object({
                      locales: z
                        .object({
                          preferred: z
                            .string()
                            .nullish()
                            .transform((value) => value ?? undefined),
                        })
                        .optional(),
                      names: z
                        .object({
                          display: z.string().default("Debug User"),
                        })
                        .prefault({}),
                      pictures: z
                        .object({
                          profile: z
                            .object({
                              url: z
                                .url()
                                .nullish()
                                .transform((value) => value ?? undefined),
                            })
                            .optional(),
                        })
                        .optional(),
                    })
                    .prefault({}),
                })
                .prefault({}),
            })
            .prefault({}),
        })
        .prefault({}),
      server: z
        .object({
          host: z.string().default("0.0.0.0"),
          port: z.coerce.number().min(0).max(65535).default(10230),
        })
        .prefault({}),
    })
    .prefault({}),
};
