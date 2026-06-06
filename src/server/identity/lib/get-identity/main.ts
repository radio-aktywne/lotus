import type { GetIdentityInput, GetIdentityOutput } from "./types";

import { orpcServerSideQueryClient } from "../../../orpc/vars/clients";
import { getQueryClient } from "../../../query/lib/get-query-client";

export async function getIdentity({
  queryClient: inputQueryClient,
}: GetIdentityInput = {}): Promise<GetIdentityOutput> {
  const queryClient = inputQueryClient ?? getQueryClient().queryClient;
  const { user } = await queryClient.fetchQuery(
    orpcServerSideQueryClient.identity.getUser.queryOptions(),
  );

  const identity = { user: user };

  return { identity: identity, queryClient: queryClient };
}
