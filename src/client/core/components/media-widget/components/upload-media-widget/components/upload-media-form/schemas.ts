import * as z from "zod";

import { constants } from "./constants";

export const Schemas = {
  Input: z.object({
    file: z.codec(z.file().nullable(), z.file().nullish(), {
      decode: (value) => value ?? undefined,
      encode: (value) => value ?? null,
    }),
    name: z.codec(z.string(), z.string().optional(), {
      decode: (value) => value || undefined,
      encode: (value) => value ?? "",
    }),
  }),
  Output: z.object({
    file: z
      .file()
      .nullable()
      .pipe(z.file().mime([...constants.file.types])),
    name: z.string().pipe(z.string().min(1)),
  }),
};
