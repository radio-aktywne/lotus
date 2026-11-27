import { useRouter } from "next/navigation";
import { useMemo } from "react";

import type {
  LocalizedRouter,
  UseLocalizedRouterInput,
  UseLocalizedRouterOutput,
} from "./types";

import { localizeHref } from "../../../../common/routing/lib/localize-href";
import { useLocaleRoutes } from "../use-locale-routes";

export function useLocalizedRouter({}: UseLocalizedRouterInput = {}): UseLocalizedRouterOutput {
  const router = useRouter();
  const { localeRoutes } = useLocaleRoutes();

  const localizedRouter = useMemo<LocalizedRouter>(() => {
    const localize = (href: string) =>
      localizeHref({ href: href, localeRoutes: localeRoutes }).href;

    return {
      ...router,
      prefetch: (href, options) => router.prefetch(localize(href), options),
      push: (href, options) => router.push(localize(href), options),
      replace: (href, options) => router.replace(localize(href), options),
    };
  }, [localeRoutes, router]);

  return useMemo(() => ({ router: localizedRouter }), [localizedRouter]);
}
