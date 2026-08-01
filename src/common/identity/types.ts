import type * as z from "zod";

import type { IdentitySchemas } from "./schemas";

export type User = z.output<typeof IdentitySchemas.User>;
