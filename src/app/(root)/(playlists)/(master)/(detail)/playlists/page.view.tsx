import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import type { PageViewInput } from "../../../../../types";
import type { Schemas } from "./schemas";

import { ListPlaylistsWidget } from "../../../../../../client/core/components/list-playlists-widget";
import { LoadingWidget } from "../../../../../../common/core/components/generic/loading-widget";
import { Hydrated } from "../../../../../../isomorphic/generic/components/hydrated";
import { orpcServerSideQueryClient } from "../../../../../../server/orpc/vars/clients";
import { getQueryClient } from "../../../../../../server/query/lib/get-query-client";

export async function PlaylistsPageView({
  queryParameters,
}: PageViewInput<typeof Schemas.Path, typeof Schemas.Query>) {
  const { queryClient } = getQueryClient();

  const limit = 10 as const;
  const order = { name: "asc" } as const;

  void queryClient.prefetchQuery(
    orpcServerSideQueryClient.core.playlists.list.queryOptions({
      input: {
        limit: limit,
        offset: (queryParameters.page - 1) * limit,
        order: order,
        where: queryParameters.query
          ? {
              name: {
                contains: queryParameters.query,
                mode: "insensitive" as const,
              },
            }
          : undefined,
      },
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Hydrated fallback={<LoadingWidget />}>
        <ListPlaylistsWidget
          limit={limit}
          order={order}
          page={queryParameters.page}
          query={queryParameters.query}
        />
      </Hydrated>
    </HydrationBoundary>
  );
}
