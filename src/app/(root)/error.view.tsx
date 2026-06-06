import { MainLayout } from "@radio-aktywne/ui";

import type { ErrorViewInput } from "../types";

import { ErrorWidget } from "../../isomorphic/core/components/generic/error-widget";

export function RootErrorView({ reset }: ErrorViewInput) {
  return (
    <MainLayout>
      <ErrorWidget reset={reset} />
    </MainLayout>
  );
}
