import type { LoadingViewInput } from "../../types";

import { LoadingWidget } from "../../../common/core/components/generic/loading-widget";

export async function MainLoadingView({}: LoadingViewInput) {
  return <LoadingWidget />;
}
