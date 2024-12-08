import { LinguiConfig } from "@lingui/conf";
import { formatter } from "@lingui/format-po";

// https://lingui.dev/ref/conf
export default {
  catalogs: [
    {
      include: ["<rootDir>/src"],
      path: "<rootDir>/src/locales/{locale}",
    },
  ],
  fallbackLocales: {
    default: "en",
  },
  format: formatter(),
  locales: ["en"],
  sourceLocale: "en",
} satisfies LinguiConfig as LinguiConfig;
