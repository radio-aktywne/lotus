import type { LocalizeHrefInput, LocalizeHrefOutput } from "./types";

import { localizePath } from "../localize-path";
import { isAbsolutePath } from "./utils";

export function localizeHref({
  href,
  localeRoutes,
}: LocalizeHrefInput): LocalizeHrefOutput {
  if (!isAbsolutePath(href)) return { href: href };

  const index = href.search(/[?#]/);
  const path = index === -1 ? href : href.slice(0, index);
  const suffix = index === -1 ? "" : href.slice(index);

  const { path: localizedPath } = localizePath({
    localeRoutes: localeRoutes,
    path: path,
  });

  return { href: localizedPath + suffix };
}
