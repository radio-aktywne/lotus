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
      server: z
        .object({
          host: z.string().default("0.0.0.0"),
          port: z.coerce.number().min(0).max(65535).default(10230),
        })
        .prefault({}),
    })
    .prefault({}),
};
