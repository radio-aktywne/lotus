import type { UnionToTuple } from "type-fest";

import dayjs from "dayjs";
import enDayjsData from "dayjs/locale/en";
import plDayjsData from "dayjs/locale/pl";
import { en as enZodDataLoader, pl as plZodDataLoader } from "zod/locales";

import type { LocaleData, SupportedLocale } from "./types";

import * as enLinguiData from "./locales/en.po";
import * as plLinguiData from "./locales/pl.po";

// Reset dayjs to its default locale because importing locales mutates global state
dayjs.locale("en");

export const commonLocalizationConstants = {
  locales: {
    data: {
      en: {
        dayjs: enDayjsData,
        lingui: enLinguiData,
        zod: enZodDataLoader(),
      },
      pl: {
        dayjs: plDayjsData,
        lingui: plLinguiData,
        zod: plZodDataLoader(),
      },
    } satisfies { [Locale in SupportedLocale]: LocaleData },
    default: "en" satisfies SupportedLocale,
    supported: ["en", "pl"] satisfies UnionToTuple<SupportedLocale>,
  },
} as const;
