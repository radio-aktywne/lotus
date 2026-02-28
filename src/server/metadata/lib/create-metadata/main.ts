import { omitBy } from "es-toolkit/object";

import type { CreateMetadataInput, CreateMetadataOutput } from "./types";

import { getLocalization } from "../../../localization/lib/get-localization";
import { resolveLocale } from "../../../localization/lib/resolve-locale";

export async function createMetadata({
  description,
  title,
}: CreateMetadataInput): Promise<CreateMetadataOutput> {
  const { locale } = await resolveLocale();
  const { localization } = getLocalization({ locale: locale });

  return omitBy(
    {
      description:
        description === undefined ||
        description === null ||
        typeof description === "string"
          ? description
          : localization.localize(description),
      title:
        title === undefined || title === null || typeof title === "string"
          ? title
          : localization.localize(title),
    },
    (value) => value === undefined,
  );
}
