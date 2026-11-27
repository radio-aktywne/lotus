import { permanentRedirect } from "next/navigation";
import { useCallback, useMemo } from "react";

import type {
  LocalizedPermanentRedirectOptions,
  UseLocalizedPermanentRedirectInput,
  UseLocalizedPermanentRedirectOutput,
} from "./types";

import { localizeHref } from "../../../../common/routing/lib/localize-href";
import { useLocaleRoutes } from "../use-locale-routes";

export function useLocalizedPermanentRedirect({}: UseLocalizedPermanentRedirectInput = {}): UseLocalizedPermanentRedirectOutput {
  const { localeRoutes } = useLocaleRoutes();

  const localizedPermanentRedirect = useCallback(
    ({ href, type }: LocalizedPermanentRedirectOptions) => {
      const { href: localizedHref } = localizeHref({
        href: href,
        localeRoutes: localeRoutes,
      });

      return permanentRedirect(localizedHref, type);
    },
    [localeRoutes],
  );

  return useMemo(
    () => ({ permanentRedirect: localizedPermanentRedirect }),
    [localizedPermanentRedirect],
  );
}
