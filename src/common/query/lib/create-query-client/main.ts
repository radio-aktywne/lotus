import { MutationCache, QueryClient } from "@tanstack/react-query";

import type { CreateQueryClientInput, CreateQueryClientOutput } from "./types";

import { constants } from "./constants";
import {
  deserialize,
  hashKey,
  invalidateQueriesForMutation,
  serialize,
  shouldDehydrateQuery,
  shouldRedactErrors,
  shouldRetryQuery,
} from "./utils";

export function createQueryClient({}: CreateQueryClientInput = {}): CreateQueryClientOutput {
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        serializeData: serialize,
        shouldDehydrateQuery: shouldDehydrateQuery,
        shouldRedactErrors: shouldRedactErrors,
      },
      hydrate: {
        deserializeData: deserialize,
      },
      queries: {
        queryKeyHashFn: hashKey,
        refetchInterval: constants.times.refetch,
        retry: shouldRetryQuery,
        staleTime: constants.times.stale,
      },
    },

    mutationCache: new MutationCache({
      onSuccess: async (data, variables, result, mutation, context) => {
        await invalidateQueriesForMutation(mutation, context.client);
      },
    }),
  });

  return { queryClient: queryClient };
}
