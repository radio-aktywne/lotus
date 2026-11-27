import { permanentRedirect } from "next/navigation";

import type { LocalizedPermanentRedirectInput } from "./types";

import { localizeHref } from "../../../../common/routing/lib/localize-href";
import { resolveLocale } from "../../../localization/lib/resolve-locale";
import { getLocalizedRoutes } from "../get-localized-routes";

export async function localizedPermanentRedirect({
  href,
  type,
}: LocalizedPermanentRedirectInput): Promise<never> {
  const { locale } = await resolveLocale();
  const { localizedRoutes } = getLocalizedRoutes();

  const { href: localizedHref } = localizeHref({
    href: href,
    localeRoutes: localizedRoutes[locale],
  });

  return permanentRedirect(localizedHref, type);
}
