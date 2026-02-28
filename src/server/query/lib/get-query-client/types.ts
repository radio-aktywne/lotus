import type { QueryClient } from "@tanstack/react-query";

export type GetQueryClientInput = object;

export type GetQueryClientOutput = {
  queryClient: QueryClient;
};
