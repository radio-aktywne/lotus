import type { GetQueryClientInput, GetQueryClientOutput } from "./types";

import { cachedCreateQueryClient } from "./utils";

export function getQueryClient({}: GetQueryClientInput = {}): GetQueryClientOutput {
  const { queryClient } = cachedCreateQueryClient();

  return { queryClient: queryClient };
}
