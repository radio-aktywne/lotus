"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

import { deletePlaylist } from "../../../../actions/pelican/playlists/delete-playlist";
import { useListPlaylists } from "../../../../hooks/pelican/playlists/use-list-playlists";
import { useToasts } from "../../../../hooks/use-toasts";
import { Controls } from "./components/controls";
import { PlaylistItem } from "./components/playlist-item";
import { PlaylistListWidgetInput } from "./types";

export function PlaylistListWidget({
  playlists: prefetchedPlaylists,
  ...props
}: PlaylistListWidgetInput) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.has("page")
    ? Number(searchParams.get("page"))
    : undefined;
  const query = searchParams.get("query") ?? undefined;

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentPlaylists, error, refresh } = useListPlaylists(props);
  const playlists = currentPlaylists ?? prefetchedPlaylists;

  const pages = Math.ceil(playlists.count / props.limit);

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleDelete = useCallback(
    async (id: string) => {
      const { error } = await deletePlaylist({ id: id });

      if (error) toasts.error(_(error));
      else toasts.success(_(msg({ message: "Playlist deleted." })));

      await refresh();
    },
    [_, refresh, toasts],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (newPage > 1) newSearchParams.set("page", newPage.toString());
      else newSearchParams.delete("page");

      const path = newSearchParams.toString()
        ? `/playlists?${newSearchParams.toString()}`
        : `/playlists`;
      router.push(path);
    },
    [router, searchParams],
  );

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.delete("page");

      if (newQuery) newSearchParams.set("query", newQuery);
      else newSearchParams.delete("query");

      const path = newSearchParams.toString()
        ? `/playlists?${newSearchParams.toString()}`
        : `/playlists`;
      router.push(path);
    },
    [router, searchParams],
  );

  useEffect(() => {
    if (page && page > pages) handlePageChange(Math.max(1, pages));
  }, [handlePageChange, page, pages]);

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <Title>{_(msg({ message: "Playlists" }))}</Title>
      </Center>
      <Controls
        onPageChange={handlePageChange}
        onQueryChange={handleQueryChange}
        page={page}
        pages={pages}
        query={query}
      />
      {playlists.count === 0 ? (
        <Center py="sm">
          <Text size="xs">{_(msg({ message: "No playlists" }))}</Text>
        </Center>
      ) : (
        <List style={{ overflowY: "auto" }}>
          {playlists.playlists.map((playlist) => (
            <ListItem key={playlist.id}>
              <PlaylistItem
                onDelete={() => handleDelete(playlist.id)}
                playlist={playlist}
              />
            </ListItem>
          ))}
        </List>
      )}
      <Button component={Link} href="/playlists/new">
        {_(msg({ message: "Create" }))}
      </Button>
    </Stack>
  );
}
