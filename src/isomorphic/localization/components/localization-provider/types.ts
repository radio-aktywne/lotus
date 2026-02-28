import type { PropsWithChildren } from "react";

import type { SupportedLocale } from "../../../../common/localization/types";

export type LocalizationProviderInput = PropsWithChildren<{
  locale: SupportedLocale;
}>;
