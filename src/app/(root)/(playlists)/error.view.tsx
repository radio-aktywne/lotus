import { msg } from "@lingui/core/macro";
import { MainLayout } from "@radio-aktywne/ui";

import type { ErrorViewInput } from "../../types";

import { ErrorWidget } from "../../../isomorphic/core/components/generic/error-widget";

export function PlaylistsErrorView({ reset }: ErrorViewInput) {
  return (
    <MainLayout>
      <ErrorWidget
        message={msg({ message: "Something went wrong" })}
        reset={reset}
      />
    </MainLayout>
  );
}
