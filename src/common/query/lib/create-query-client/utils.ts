import type { Mutation, Query, QueryClient } from "@tanstack/react-query";

import { ORPCError } from "@orpc/contract";
import { defaultShouldDehydrateQuery, matchQuery } from "@tanstack/react-query";

import type { SerializedData } from "./types";

import { getExecutionContext } from "../../../generic/lib/get-execution-context";
import { constants } from "./constants";
import { serializer } from "./vars";

export function serialize(data: unknown) {
  const [json, metadata] = serializer.serialize(data);
  return { json: json, metadata: metadata } satisfies SerializedData;
}

export function deserialize(data: SerializedData) {
  return serializer.deserialize(data.json, data.metadata);
}

export function hashKey(key: unknown) {
  const [json, metadata] = serializer.serialize(key);
  const data = {
    json: json,
    metadata: metadata,
  } satisfies SerializedData;
  return JSON.stringify(data);
}

export function shouldDehydrateQuery(query: Query) {
  return defaultShouldDehydrateQuery(query) || query.state.status === "pending";
}

export function shouldRedactErrors() {
  return false;
}

export function shouldRetryQuery(failureCount: number, error: unknown) {
  if (getExecutionContext().context.runtime === "server") return false;

  if (error instanceof ORPCError && error.status >= 400 && error.status < 500)
    return false;

  return failureCount < constants.retries;
}

export async function invalidateQueriesForMutation(
  mutation: Mutation<unknown, unknown, unknown, unknown>,
  client: QueryClient,
) {
  const invalidates = (mutation.meta?.invalidates ?? true) || [];
  const awaits = (mutation.meta?.awaits ?? false) || [];

  const matchesInvalidates = (query: Query) =>
    invalidates === true ||
    invalidates.some((key) => matchQuery({ queryKey: key }, query));

  const matchesAwaits = (query: Query) =>
    awaits === true ||
    awaits.some((key) => matchQuery({ queryKey: key }, query));

  void client.invalidateQueries({
    predicate: (query) => matchesInvalidates(query) && !matchesAwaits(query),
  });

  await client.invalidateQueries({
    predicate: (query) => matchesInvalidates(query) && matchesAwaits(query),
  });
}
