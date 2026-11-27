import { usePathname } from "next/navigation";
import { useMemo } from "react";

import type {
  UseDelocalizedPathnameInput,
  UseDelocalizedPathnameOutput,
} from "./types";

import { resolvePath } from "../../../../common/routing/lib/resolve-path";
import { useLocalization } from "../../../localization/hooks/use-localization";
import { useLocalizedRoutes } from "../use-localized-routes";

export function useDelocalizedPathname({}: UseDelocalizedPathnameInput = {}): UseDelocalizedPathnameOutput {
  const pathname = usePathname();
  const { localization } = useLocalization();
  const { localizedRoutes } = useLocalizedRoutes();

  const delocalizedPathname = useMemo(() => {
    const { path } = resolvePath({
      locale: localization.locale,
      localizedRoutes: localizedRoutes,
      path: pathname,
    });

    return path ?? pathname;
  }, [localization.locale, localizedRoutes, pathname]);

  return useMemo(
    () => ({ pathname: delocalizedPathname }),
    [delocalizedPathname],
  );
}
