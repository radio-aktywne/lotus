import { redirect } from "next/navigation";

import type { LocalizedRedirectInput } from "./types";

import { localizeHref } from "../../../../common/routing/lib/localize-href";
import { resolveLocale } from "../../../localization/lib/resolve-locale";
import { getLocalizedRoutes } from "../get-localized-routes";

export async function localizedRedirect({
  href,
  type,
}: LocalizedRedirectInput): Promise<never> {
  const { locale } = await resolveLocale();
  const { localizedRoutes } = getLocalizedRoutes();

  const { href: localizedHref } = localizeHref({
    href: href,
    localeRoutes: localizedRoutes[locale],
  });

  return redirect(localizedHref, type);
}
