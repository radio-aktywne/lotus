import type { QueryClient } from "@tanstack/react-query";

import type { SupportedLocale } from "../../../../common/localization/types";

export type ResolveLocaleInput = {
  queryClient?: QueryClient;
};

export type ResolveLocaleOutput = {
  locale: SupportedLocale;
  queryClient: QueryClient;
};
