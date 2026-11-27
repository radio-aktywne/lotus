"use client";

import Link from "next/link";

import type { LocalizedLinkInput } from "./types";

import { localizeHref } from "../../../../common/routing/lib/localize-href";
import { useLocaleRoutes } from "../../hooks/use-locale-routes";

export function LocalizedLink({ href, ...input }: LocalizedLinkInput) {
  const { localeRoutes } = useLocaleRoutes();

  const localize = (href: string) =>
    localizeHref({ href: href, localeRoutes: localeRoutes }).href;

  const localizedHref =
    typeof href === "string"
      ? localize(href)
      : { ...href, pathname: href.pathname && localize(href.pathname) };

  return <Link {...input} href={localizedHref} />;
}
