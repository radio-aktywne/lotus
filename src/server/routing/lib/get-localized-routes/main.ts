import { mapValues } from "es-toolkit/object";

import type {
  GetLocalizedRoutesInput,
  GetLocalizedRoutesOutput,
} from "./types";

import { commonLocalizationConstants } from "../../../../common/localization/constants";
import { commonRoutingConstants } from "../../../../common/routing/constants";
import { getLocalization } from "../../../localization/lib/get-localization";
import { encodePath } from "./utils";

export function getLocalizedRoutes({}: GetLocalizedRoutesInput = {}): GetLocalizedRoutesOutput {
  const localizedRoutes = mapValues(
    commonLocalizationConstants.locales.data,
    (data, locale) => {
      const { localization } = getLocalization({ locale: locale });

      return mapValues(commonRoutingConstants.routes, (message) =>
        encodePath(localization.localize(message)),
      );
    },
  );

  return { localizedRoutes: localizedRoutes };
}
