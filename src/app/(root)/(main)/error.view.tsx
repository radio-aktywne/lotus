import { msg } from "@lingui/core/macro";

import type { ErrorViewInput } from "../../types";

import { ErrorWidget } from "../../../isomorphic/core/components/generic/error-widget";

export function MainErrorView({ reset }: ErrorViewInput) {
  return (
    <ErrorWidget
      message={msg({ message: "Something went wrong" })}
      reset={reset}
    />
  );
}
