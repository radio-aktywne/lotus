import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import type { PageViewInput } from "../../../../../../../types";
import type { Schemas } from "./schemas";

import { EditPlaylistWidget } from "../../../../../../../../client/core/components/edit-playlist-widget";
import { LoadingWidget } from "../../../../../../../../common/core/components/generic/loading-widget";
import { isOrpcDefinedError } from "../../../../../../../../common/orpc/lib/is-orpc-defined-error";
import { Hydrated } from "../../../../../../../../isomorphic/generic/components/hydrated";
import { orpcServerSideQueryClient } from "../../../../../../../../server/orpc/vars/clients";
import { getQueryClient } from "../../../../../../../../server/query/lib/get-query-client";

export async function PlaylistsIdEditPageView({
  pathParameters,
}: PageViewInput<typeof Schemas.Path, typeof Schemas.Query>) {
  const { queryClient } = getQueryClient();

  await (async () => {
    try {
      return await queryClient.fetchQuery(
        orpcServerSideQueryClient.core.playlists.get.queryOptions({
          input: { id: pathParameters.id },
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
        <EditPlaylistWidget id={pathParameters.id} />
      </Hydrated>
    </HydrationBoundary>
  );
}
