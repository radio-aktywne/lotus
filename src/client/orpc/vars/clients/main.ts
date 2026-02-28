import type { ContractRouterClient } from "@orpc/contract";

import { createORPCClient, createSafeClient } from "@orpc/client";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

import type { orpcContractRouter } from "../../../../common/orpc/vars/router";
import type { ClientContext } from "../../types/context";

import { orpcClientLink } from "../link";

export const orpcClientSideClient =
  createORPCClient<
    ContractRouterClient<typeof orpcContractRouter, ClientContext>
  >(orpcClientLink);

export const orpcClientSideQueryClient =
  createTanstackQueryUtils(orpcClientSideClient);

export const orpcClientSideSafeClient = createSafeClient(orpcClientSideClient);
