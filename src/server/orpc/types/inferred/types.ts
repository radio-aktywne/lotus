import type { InferClientContext } from "@orpc/client";
import type {
  InferRouterCurrentContexts,
  InferRouterInitialContexts,
} from "@orpc/server";

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
