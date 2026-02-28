"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMemo } from "react";

import type { QueryProviderInput } from "./types";

import { createQueryClient } from "../../../../common/query/lib/create-query-client";

export function QueryProvider({ children }: QueryProviderInput) {
  const { queryClient } = useMemo(() => createQueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      {children}
    </QueryClientProvider>
  );
}
