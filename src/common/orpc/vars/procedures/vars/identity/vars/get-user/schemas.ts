import * as z from "zod";

import { IdentitySchemas } from "../../../../../../../identity/schemas";

export const Schemas = {
  Input: z.undefined(),
  Output: z.object({
    user: IdentitySchemas.User.nullable(),
  }),
};
