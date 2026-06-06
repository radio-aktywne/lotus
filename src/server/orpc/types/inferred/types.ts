import type { InferClientContext } from "@orpc/client";
import type { InferContractRouterErrorMap } from "@orpc/contract";
import type {
  InferRouterCurrentContexts,
  InferRouterInitialContexts,
  ORPCErrorConstructorMap,
} from "@orpc/server";

import type { orpcContractRouter } from "../../../../common/orpc/vars/router";
import type { orpcServerSideClient } from "../../vars/clients";
import type { orpcServerRouter } from "../../vars/router";

export type ORPCServerSideClientContext = InferClientContext<
  typeof orpcServerSideClient
>;

export type ORPCServerRouterInitialContexts = InferRouterInitialContexts<
  typeof orpcServerRouter
>;

export type ORPCServerRouterCurrentContexts = InferRouterCurrentContexts<
  typeof orpcServerRouter
>;

export type ORPCDefinedErrors = ORPCErrorConstructorMap<
  InferContractRouterErrorMap<typeof orpcContractRouter>
>;
