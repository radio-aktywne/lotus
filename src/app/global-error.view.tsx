import type { ErrorViewInput } from "./types";

import { SafeMainLayout } from "../common/core/components/generic/safe-main-layout";
import { SafePageLayout } from "../common/core/components/generic/safe-page-layout";
import { SafeErrorWidget } from "../isomorphic/core/components/generic/safe-error-widget";

export function GlobalErrorView({ reset }: ErrorViewInput) {
  return (
    <SafePageLayout>
      <SafeMainLayout>
        <SafeErrorWidget message="Something went wrong" reset={reset} />
      </SafeMainLayout>
    </SafePageLayout>
  );
}
