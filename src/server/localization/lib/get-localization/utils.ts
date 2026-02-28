import { cache } from "react";

import type { SupportedLocale } from "../../../../common/localization/types";

import { createLingui } from "../../../../common/localization/lib/create-lingui";

export const cachedCreateLingui = cache((locale: SupportedLocale) =>
  createLingui({ locale: locale }),
);
