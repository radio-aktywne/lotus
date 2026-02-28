import type { LinguiConfig } from "@lingui/conf";

import { formatter } from "@lingui/format-po";

// https://lingui.dev/ref/conf
export default {
  catalogs: [
    {
      include: ["<rootDir>/src"],
      path: "<rootDir>/src/common/localization/locales/{locale}",
    },
  ],
  fallbackLocales: {
    default: "en",
  },
  format: formatter(),
  locales: ["en", "pl"],
  sourceLocale: "en",
} satisfies LinguiConfig;
