import { implement } from "@orpc/server";

import type { ServerInitialContext } from "../../types/context";

import { orpcContractRouter } from "../../../../common/orpc/vars/router";

export const orpcServerImplementer = implement<
  typeof orpcContractRouter,
  ServerInitialContext
>(orpcContractRouter);
