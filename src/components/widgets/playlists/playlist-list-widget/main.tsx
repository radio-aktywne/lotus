"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Stack, Title } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useCallback, useEffect } from "react";

import { deletePlaylist } from "../../../../actions/pelican/playlists/delete-playlist";
import { useListPlaylists } from "../../../../hooks/pelican/playlists/use-list-playlists";
import { useToasts } from "../../../../hooks/use-toasts";
import { PlaylistItem } from "./components/playlist-item";
import { PlaylistListWidgetInput } from "./types";

export function PlaylistListWidget({
  playlists: prefetchedPlaylists,
  ...props
}: PlaylistListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentPlaylists, error, refresh } = useListPlaylists(props);
  const playlists = currentPlaylists ?? prefetchedPlaylists;

  const handleDelete = useCallback(
    async (id: string) => {
      const { error } = await deletePlaylist({ id: id });

      if (error) toasts.error(_(error));
      else toasts.success(_(msg({ message: "Playlist deleted." })));

      await refresh();
    },
    [_, refresh, toasts],
  );

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  return (
    <Stack mah="100%" w="100%">
      {playlists.count === 0 ? (
        <Center>
          <Title>{_(msg({ message: "No playlists." }))}</Title>
        </Center>
      ) : (
        <>
          <Center>
            <Title>{_(msg({ message: "Playlists" }))}</Title>
          </Center>
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
        </>
      )}
      <Button component={Link} href="/playlists/new">
        {_(msg({ message: "Create" }))}
      </Button>
    </Stack>
  );
}
