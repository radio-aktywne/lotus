import type { ResolveLocaleInput, ResolveLocaleOutput } from "./types";

import { orpcServerSideQueryClient } from "../../../orpc/vars/clients";
import { getQueryClient } from "../../../query/lib/get-query-client";

export async function resolveLocale({
  queryClient: inputQueryClient,
}: ResolveLocaleInput = {}): Promise<ResolveLocaleOutput> {
  const queryClient = inputQueryClient ?? getQueryClient().queryClient;
  const { locale } = await queryClient.fetchQuery(
    orpcServerSideQueryClient.localization.resolveLocale.queryOptions(),
  );

  return { locale: locale, queryClient: queryClient };
}
