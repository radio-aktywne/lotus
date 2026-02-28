import type { GetLocalizationInput, GetLocalizationOutput } from "./types";

import { commonLocalizationConstants } from "../../../../common/localization/constants";
import { cachedCreateLingui } from "./utils";

export function getLocalization({
  locale,
}: GetLocalizationInput): GetLocalizationOutput {
  const { lingui } = cachedCreateLingui(locale);

  const localization = {
    data: commonLocalizationConstants.locales.data[locale],
    lingui: lingui,
    locale: locale,
    localize: lingui._.bind(lingui),
  };

  return { localization: localization };
}
