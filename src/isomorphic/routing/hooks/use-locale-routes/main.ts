import { useMemo } from "react";

import type { UseLocaleRoutesInput, UseLocaleRoutesOutput } from "./types";

import { useLocalization } from "../../../localization/hooks/use-localization";
import { useLocalizedRoutes } from "../use-localized-routes";

export function useLocaleRoutes({}: UseLocaleRoutesInput = {}): UseLocaleRoutesOutput {
  const { localization } = useLocalization();
  const { localizedRoutes } = useLocalizedRoutes();

  const localeRoutes = localizedRoutes[localization.locale];

  return useMemo(() => ({ localeRoutes: localeRoutes }), [localeRoutes]);
}
