import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import type { PageViewInput } from "../../../../../../types";
import type { Schemas } from "./schemas";

import { PlaylistWidget } from "../../../../../../../client/core/components/playlist-widget";
import { LoadingWidget } from "../../../../../../../common/core/components/generic/loading-widget";
import { isOrpcDefinedError } from "../../../../../../../common/orpc/lib/is-orpc-defined-error";
import { Hydrated } from "../../../../../../../isomorphic/generic/components/hydrated";
import { orpcServerSideQueryClient } from "../../../../../../../server/orpc/vars/clients";
import { getQueryClient } from "../../../../../../../server/query/lib/get-query-client";

export async function PlaylistsIdPageView({
  pathParameters,
}: PageViewInput<typeof Schemas.Path, typeof Schemas.Query>) {
  const { queryClient } = getQueryClient();

  await (async () => {
    try {
      return await queryClient.fetchQuery(
        orpcServerSideQueryClient.core.playlists.get.queryOptions({
          input: {
            id: pathParameters.id,
            include: {
              bindings: {
                include: { media: true, playlist: true },
                orderBy: { rank: "asc" },
              },
            },
          },
        }),
      );
    } catch (error) {
      if (isOrpcDefinedError(error) && error.code === "NOT_FOUND") notFound();
      throw error;
    }
  })();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Hydrated fallback={<LoadingWidget />}>
        <PlaylistWidget id={pathParameters.id} order="asc" />
      </Hydrated>
    </HydrationBoundary>
  );
}
