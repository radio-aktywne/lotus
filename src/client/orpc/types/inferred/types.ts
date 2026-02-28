import type { InferClientContext } from "@orpc/client";

import type { orpcClientSideClient } from "../../vars/clients";

export type ORPCClientSideClientContext = InferClientContext<
  typeof orpcClientSideClient
>;
