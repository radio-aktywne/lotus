import * as z from "zod";

import { commonLocalizationConstants } from "../../../../../../../localization/constants";

export const Schemas = {
  Input: z.undefined(),
  Output: z.object({
    locale: z.enum(commonLocalizationConstants.locales.supported),
  }),
};
