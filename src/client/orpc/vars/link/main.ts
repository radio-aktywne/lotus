import { RPCLink } from "@orpc/client/fetch";

import type { ClientContext } from "../../types/context";

export const orpcClientLink = new RPCLink<ClientContext>({
  url: () => window.location.origin + "/api/orpc",
});
