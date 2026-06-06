import { PageLayout } from "@radio-aktywne/ui";

import type { LayoutViewInput } from "../types";
import type { Schemas } from "./schemas";
import type { Keys } from "./types";

import { IdentityWidget } from "../../isomorphic/identity/components/identity-widget";

export async function RootLayoutView({
  children,
}: LayoutViewInput<typeof Schemas.Path, Keys.Slots>) {
  return (
    <PageLayout>
      <IdentityWidget />
      {children}
    </PageLayout>
  );
}
