import { MainLayout } from "@radio-aktywne/ui";

import type { NotFoundViewInput } from "../types";

import { NotFoundWidget } from "../../isomorphic/core/components/generic/not-found-widget";

export async function RootNotFoundView({}: NotFoundViewInput) {
  return (
    <MainLayout>
      <NotFoundWidget />
    </MainLayout>
  );
}
