import { MainLayout } from "@radio-aktywne/ui";

import type { ForbiddenViewInput } from "../types";

import { ForbiddenWidget } from "../../isomorphic/access/components/forbidden-widget";

export async function RootForbiddenView({}: ForbiddenViewInput) {
  return (
    <MainLayout>
      <ForbiddenWidget />
    </MainLayout>
  );
}
