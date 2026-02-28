import type { StandardRPCJsonSerializedMetaItem } from "@orpc/client/standard";
import type { QueryClient } from "@tanstack/react-query";

export type SerializedData = {
  json: unknown;
  metadata: StandardRPCJsonSerializedMetaItem[];
};

export type CreateQueryClientInput = object;

export type CreateQueryClientOutput = {
  queryClient: QueryClient;
};
