import type { ErrorViewInput } from "../../../../types";

import { ErrorWidget } from "../../../../../isomorphic/core/components/generic/error-widget";

export function PlaylistsDetailErrorView({ reset }: ErrorViewInput) {
  return <ErrorWidget reset={reset} />;
}
