import type { MessageDescriptor } from "@lingui/core";

import type {
  Lingui,
  LocaleData,
  SupportedLocale,
} from "../../../../common/localization/types";

export type Localization = {
  data: LocaleData;
  lingui: Lingui;
  locale: SupportedLocale;
  localize: (message: MessageDescriptor) => string;
};

export type UseLocalizationInput = object;

export type UseLocalizationOutput = {
  localization: Localization;
};
