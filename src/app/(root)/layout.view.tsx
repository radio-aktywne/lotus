import { PageLayout } from "@radio-aktywne/ui";

import type { LayoutViewInput } from "../types";
import type { Schemas } from "./schemas";
import type { Keys } from "./types";

import { IdentityWidget } from "../../isomorphic/identity/components/identity-widget";
import { getOriginalBaseUrl } from "../../server/generic/lib/get-original-base-url";
import { state } from "../../server/state/vars/state";

export async function RootLayoutView({
  children,
}: LayoutViewInput<typeof Schemas.Path, Keys.Slots>) {
  const { originalBaseUrl } = await getOriginalBaseUrl();

  return (
    <PageLayout>
      <IdentityWidget
        urls={{
          base: originalBaseUrl,
          orchid: state.current.config.urls.orchid,
          sunflower: state.current.config.urls.sunflower,
        }}
      />
      {children}
    </PageLayout>
  );
}
