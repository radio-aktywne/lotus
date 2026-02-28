import type { MessageDescriptor } from "@lingui/core";

import { useLingui } from "@lingui/react";
import { useCallback, useMemo } from "react";

import type { SupportedLocale } from "../../../../common/localization/types";
import type { UseLocalizationInput, UseLocalizationOutput } from "./types";

import { commonLocalizationConstants } from "../../../../common/localization/constants";

export function useLocalization({}: UseLocalizationInput = {}): UseLocalizationOutput {
  const { _, i18n: lingui } = useLingui();

  const locale = lingui.locale as SupportedLocale;
  const localize = useCallback((message: MessageDescriptor) => _(message), [_]);

  const localization = useMemo(
    () => ({
      data: commonLocalizationConstants.locales.data[locale],
      lingui: lingui,
      locale: locale,
      localize: localize,
    }),
    [lingui, locale, localize],
  );

  return useMemo(() => ({ localization: localization }), [localization]);
}
