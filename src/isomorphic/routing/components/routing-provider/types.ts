import type { PropsWithChildren } from "react";

import type { LocalizedRoutes } from "../../../../common/routing/types";

export type RoutingProviderInput = PropsWithChildren<{
  localizedRoutes: LocalizedRoutes;
}>;
