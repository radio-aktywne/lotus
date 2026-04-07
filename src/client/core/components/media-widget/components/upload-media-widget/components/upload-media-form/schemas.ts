import * as z from "zod";

import { constants } from "./constants";

export const Schemas = {
  Values: z.object({
    file: z
      .file()
      .mime([...constants.file.types])
      .optional(),
    name: z.string().min(1),
  }),
};
