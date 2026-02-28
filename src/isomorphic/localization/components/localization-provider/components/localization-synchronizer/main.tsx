import { useWindowEvent } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import type { LocalizationSynchronizerInput } from "./types";

import { orpcClientSideQueryClient } from "../../../../../../client/orpc/vars/clients";
import { useLocalization } from "../../../../hooks/use-localization";

export function LocalizationSynchronizer({}: LocalizationSynchronizerInput) {
  const { localization } = useLocalization();

  const resolveLocaleQuery = useQuery(
    orpcClientSideQueryClient.localization.resolveLocale.queryOptions({
      refetchInterval: 0,
      staleTime: 0,
    }),
  );

  useEffect(() => {
    if (resolveLocaleQuery.data === undefined) return;
    if (resolveLocaleQuery.data.locale === localization.locale) return;

    localization.lingui.activate(resolveLocaleQuery.data.locale);
  }, [localization.locale, localization.lingui, resolveLocaleQuery.data]);

  useWindowEvent(
    "languagechange",
    async () => await resolveLocaleQuery.refetch(),
  );

  return null;
}
