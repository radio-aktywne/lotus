import { RPCHandler } from "@orpc/server/fetch";

import { orpcServerRouter } from "../router";

export const orpcServerHandler = new RPCHandler(orpcServerRouter);
