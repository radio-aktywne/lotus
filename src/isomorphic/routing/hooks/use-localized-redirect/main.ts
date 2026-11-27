import { redirect } from "next/navigation";
import { useCallback, useMemo } from "react";

import type {
  LocalizedRedirectOptions,
  UseLocalizedRedirectInput,
  UseLocalizedRedirectOutput,
} from "./types";

import { localizeHref } from "../../../../common/routing/lib/localize-href";
import { useLocaleRoutes } from "../use-locale-routes";

export function useLocalizedRedirect({}: UseLocalizedRedirectInput = {}): UseLocalizedRedirectOutput {
  const { localeRoutes } = useLocaleRoutes();

  const localizedRedirect = useCallback(
    ({ href, type }: LocalizedRedirectOptions) => {
      const { href: localizedHref } = localizeHref({
        href: href,
        localeRoutes: localeRoutes,
      });

      return redirect(localizedHref, type);
    },
    [localeRoutes],
  );

  return useMemo(() => ({ redirect: localizedRedirect }), [localizedRedirect]);
}
