import { msg } from "@lingui/core/macro";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import type {
  PageInput,
  PageMetadataInput,
  PageMetadataUtilityInput,
} from "../../../../../../../types";
import type { Keys } from "./types";

import { isOrpcDefinedError } from "../../../../../../../../common/orpc/lib/is-orpc-defined-error";
import { Metadata } from "../../../../../../../../isomorphic/metadata/components/metadata";
import { createMetadata } from "../../../../../../../../server/metadata/lib/create-metadata";
import { orpcServerSideQueryClient } from "../../../../../../../../server/orpc/vars/clients";
import { getQueryClient } from "../../../../../../../../server/query/lib/get-query-client";
import { PlaylistsIdEditPageView } from "./page.view";
import { Schemas } from "./schemas";

async function getTitle({
  pathParameters,
}: PageMetadataUtilityInput<typeof Schemas.Path, typeof Schemas.Query>) {
  const { queryClient } = getQueryClient();

  const playlist = await (async () => {
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

  const playlistName = playlist.name;

  return msg({ message: `${playlistName} • lotus` });
}

export async function generateMetadata({
  params,
}: PageMetadataInput<Keys.Path, Keys.Query>) {
  const pathParameters = await Schemas.Path.parseAsync(await params);

  return await createMetadata({
    title: await getTitle({ pathParameters: pathParameters }),
  });
}

export default async function PlaylistsIdEditPage({
  params,
}: PageInput<Keys.Path, Keys.Query>) {
  await connection();

  const pathParameters = await Schemas.Path.parseAsync(await params);

  return (
    <>
      <Metadata title={await getTitle({ pathParameters: pathParameters })} />
      <PlaylistsIdEditPageView pathParameters={pathParameters} />
    </>
  );
}
