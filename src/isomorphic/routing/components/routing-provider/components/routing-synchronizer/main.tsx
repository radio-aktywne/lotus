import { usePathname } from "next/navigation";
import { useEffect } from "react";

import type { RoutingSynchronizerInput } from "./types";

import { localizePath } from "../../../../../../common/routing/lib/localize-path";
import { useDelocalizedPathname } from "../../../../hooks/use-delocalized-pathname";
import { useLocaleRoutes } from "../../../../hooks/use-locale-routes";

export function RoutingSynchronizer({}: RoutingSynchronizerInput) {
  const pathname = usePathname();
  const { pathname: delocalizedPathname } = useDelocalizedPathname();
  const { localeRoutes } = useLocaleRoutes();

  useEffect(() => {
    const { path: localizedPathname } = localizePath({
      localeRoutes: localeRoutes,
      path: delocalizedPathname,
    });

    if (localizedPathname === pathname) return;

    const { hash, search } = window.location;
    window.history.replaceState(
      null,
      "",
      `${localizedPathname}${search}${hash}`,
    );
  }, [delocalizedPathname, localeRoutes, pathname]);

  return null;
}
