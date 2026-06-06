import * as z from "zod";

import { IdentitySchemas } from "../../../../common/identity/schemas";

export const Schemas = {
  Id: IdentitySchemas.User.shape.id,
  Traits: z
    .base64()
    .transform((value) => Buffer.from(value, "base64").toString("utf8"))
    .transform((value, ctx) => {
      try {
        return JSON.parse(value) as unknown;
      } catch {
        ctx.addIssue({ code: "custom", message: "Invalid JSON" });
        return z.NEVER;
      }
    })
    .pipe(IdentitySchemas.User.shape.traits),
};
