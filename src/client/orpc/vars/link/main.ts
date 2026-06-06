import { RPCLink } from "@orpc/client/fetch";

import type { ClientContext } from "../../types/context";

export const orpcClientLink = new RPCLink<ClientContext>({
  headers: { Accept: "application/json" },
  url: () => window.location.origin + "/api/orpc",
});
