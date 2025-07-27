"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  Button,
  Center,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { List } from "@radio-aktywne/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { deleteBinding } from "../../../../actions/pelican/bindings/delete-binding";
import { updateBinding } from "../../../../actions/pelican/bindings/update-binding";
import { deletePlaylist } from "../../../../actions/pelican/playlists/delete-playlist";
import { useGetPlaylist } from "../../../../hooks/pelican/playlists/use-get-playlist";
import {
  useDropMonitor,
  UseDropMonitorDropData,
} from "../../../../hooks/use-drop-monitor";
import { useToasts } from "../../../../hooks/use-toasts";
import { BindingItem } from "./components/binding-item";
import { PlaylistWidgetBinding, PlaylistWidgetInput } from "./types";
import { findWithNeighbours, formatDisplayName, getRankBetween } from "./utils";

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

  const handleBindingMove = useCallback(
    async ({
      edge,
      source,
      target,
    }: UseDropMonitorDropData<
      PlaylistWidgetBinding,
      PlaylistWidgetBinding
    >) => {
      if (source.data.id === target.data.id) return;

      const { item, next, previous } = findWithNeighbours(
        playlist.bindings ?? [],
        (binding) => binding.id === target.data.id,
      );

      if (
        !item ||
        (edge === "top" && previous?.id === source.data.id) ||
        (edge === "bottom" && next?.id === source.data.id)
      )
        return;

      const rank =
        edge === "top"
          ? getRankBetween(previous?.rank, item.rank)
          : getRankBetween(item.rank, next?.rank);

      const { error } = await updateBinding({
        data: { rank: rank },
        id: source.data.id,
      });

      if (error) toasts.error(_(error));
      else toasts.success(_(msg({ message: "Media moved successfully." })));

      await refresh();
    },
    [_, playlist.bindings, refresh, toasts],
  );

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

  useDropMonitor({
    onDrop: handleBindingMove,
    source: "binding",
    target: "binding",
  });

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
      {(playlist.bindings?.length ?? 0) === 0 ? (
        <Center>
          <Text fw="bold">{_(msg({ message: "Playlist is empty." }))}</Text>
        </Center>
      ) : (
        <List style={{ overflowY: "auto" }}>
          {playlist.bindings?.map((binding, index) => (
            <BindingItem
              binding={binding}
              index={index}
              key={binding.rank}
              onRemove={() => handleBindingRemove(binding.id)}
              total={playlist.bindings?.length ?? 0}
            />
          ))}
        </List>
      )}
      <Button component={Link} href={`/playlists/${playlist.id}/add`}>
        {_(msg({ message: "Add media" }))}
      </Button>
      <Button color="ra-red" onClick={handlePlaylistDelete}>
        {_(msg({ message: "Delete" }))}
      </Button>
    </Stack>
  );
}
