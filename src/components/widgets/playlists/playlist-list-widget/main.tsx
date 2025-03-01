"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Pagination, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useListPlaylists } from "../../../../hooks/pelican/playlists/use-list-playlists";
import { useToasts } from "../../../../hooks/use-toasts";
import { PlaylistTile } from "./components/playlist-tile";
import { PlaylistListWidgetInput } from "./types";

export function PlaylistListWidget({
  perPage = 5,
  playlists: prefetchedPlaylists,
  where,
}: PlaylistListWidgetInput) {
  const [page, setPage] = useState(1);

  const { _ } = useLingui();
  const toasts = useToasts();

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { data: currentPlaylists, error } = useListPlaylists({
    limit: limit,
    offset: offset,
    where: where,
  });
  const playlists = currentPlaylists ?? prefetchedPlaylists;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (playlists.count === 0) {
    return <Title>{_(msg({ message: "No playlists." }))}</Title>;
  }

  const pages = Math.ceil(playlists.count / perPage);

  return (
    <Stack>
      <Stack>
        {playlists.playlists.map((playlist) => (
          <PlaylistTile key={playlist.id} playlist={playlist} />
        ))}
      </Stack>
      <Center>
        <Stack>
          <Pagination onChange={setPage} total={pages} value={page} withEdges />
          <Button component={Link} href={"/playlists/new"}>
            {_(msg({ message: "Create" }))}
          </Button>
        </Stack>
      </Center>
    </Stack>
  );
}
