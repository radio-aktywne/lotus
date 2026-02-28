import "server-only";
import type * as z from "zod";

import type { ConfigSchemas } from "./schemas";

export type Config = z.infer<typeof ConfigSchemas.Config>;
