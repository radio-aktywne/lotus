import type * as z from "zod";

import type { IdentitySchemas } from "./schemas";

export type User = z.infer<typeof IdentitySchemas.User>;
