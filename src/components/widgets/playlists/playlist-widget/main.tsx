"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Stack, Title, UnstyledButton } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { deleteBinding } from "../../../../actions/pelican/bindings/delete-binding";
import { deletePlaylist } from "../../../../actions/pelican/playlists/delete-playlist";
import { useGetPlaylist } from "../../../../hooks/pelican/playlists/use-get-playlist";
import { useToasts } from "../../../../hooks/use-toasts";
import { BindingItem } from "./components/binding-item";
import { PlaylistWidgetInput } from "./types";
import { formatDisplayName } from "./utils";

export function PlaylistWidget({
  playlist: prefetchedPlaylist,
  ...props
}: PlaylistWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentPlaylist, error, refresh } = useGetPlaylist(props);
  const playlist = currentPlaylist ?? prefetchedPlaylist;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleBindingRemove = useCallback(
    async (id: string) => {
      const { error } = await deleteBinding({ id: id });

      if (error) toasts.error(_(error));
      else toasts.success(_(msg({ message: "Media removed from playlist." })));

      await refresh();
    },
    [_, refresh, toasts],
  );

  const handlePlaylistDelete = useCallback(async () => {
    const { error: deleteError } = await deletePlaylist({ id: playlist.id });

    if (deleteError) {
      toasts.error(_(deleteError));
      router.refresh();
    } else {
      toasts.success(_(msg({ message: "Playlist deleted successfully" })));
      router.push("/playlists");
    }
  }, [_, playlist, router, toasts]);

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <UnstyledButton
          component={Link}
          href={`/playlists/${playlist.id}/edit`}
        >
          <Title>{formatDisplayName(playlist)}</Title>
        </UnstyledButton>
      </Center>
      <List style={{ overflowY: "auto" }}>
        {playlist.bindings?.map((binding) => (
          <ListItem key={binding.rank}>
            <BindingItem
              binding={binding}
              onRemove={() => handleBindingRemove(binding.id)}
            />
          </ListItem>
        ))}
      </List>
      <Button component={Link} href={`/playlists/${playlist.id}/add`}>
        {_(msg({ message: "Add" }))}
      </Button>
      <Button color="ra-red" onClick={handlePlaylistDelete}>
        {_(msg({ message: "Delete" }))}
      </Button>
    </Stack>
  );
}
