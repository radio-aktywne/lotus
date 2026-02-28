import { I18n } from "@lingui/core";
import { mapValues } from "es-toolkit/object";

import type { CreateLinguiInput, CreateLinguiOutput } from "./types";

import { commonLocalizationConstants } from "../../constants";

export function createLingui({
  locale,
}: CreateLinguiInput): CreateLinguiOutput {
  const lingui = new I18n({
    locale: locale,
    messages: mapValues(
      commonLocalizationConstants.locales.data,
      (data) => data.lingui.messages,
    ),
  });

  return { lingui: lingui };
}
