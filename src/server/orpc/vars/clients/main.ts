import { createSafeClient } from "@orpc/client";
import { createRouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

import type { ServerInitialContext } from "../../types/context";

import { orpcServerRouter } from "../router";

export const orpcServerSideClient = createRouterClient<
  typeof orpcServerRouter,
  ServerInitialContext
>(orpcServerRouter);

export const orpcServerSideQueryClient =
  createTanstackQueryUtils(orpcServerSideClient);

export const orpcServerSideSafeClient = createSafeClient(orpcServerSideClient);
