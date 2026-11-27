import * as z from "zod";

import { GetRandomJokeResponseSchema } from "../../../../../../../apis/icanhazdadjoke/schemas";

export const Schemas = {
  Input: z.object({
    value: z.string().pipe(z.literal("test")),
  }),
  Output: z.object({
    message: GetRandomJokeResponseSchema.shape.joke,
    value: z.literal("test"),
  }),
};
