import type { LoadingViewInput } from "../../../../types";

import { LoadingWidget } from "../../../../../common/core/components/generic/loading-widget";

export async function PlaylistsDetailLoadingView({}: LoadingViewInput) {
  return <LoadingWidget />;
}
