"use client";

import type { SetNonNullableDeep } from "type-fest";

import { msg } from "@lingui/core/macro";
import { Button, Stack, Title } from "@mantine/core";
import { List } from "@radio-aktywne/ui";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import type { PlaylistWidgetInput } from "./types";

import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import { BindingItem } from "./components/binding-item";
import { EmptyNotice } from "./components/empty-notice";
import { MoveMonitor } from "./components/move-monitor";

export function PlaylistWidget({ id, order }: PlaylistWidgetInput) {
  const router = useRouter();

  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const playlistsGetInput = useMemo(
    () => ({
      id: id,
      include: {
        bindings: {
          include: { media: true, playlist: true },
          orderBy: { rank: order },
        },
      },
    }),
    [id, order],
  );

  const playlistsGetQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.playlists.get.queryOptions({
      input: playlistsGetInput,
    }),
  );

  const playlistsDeleteMutation = useMutation(
    orpcClientSideQueryClient.core.playlists.delete.mutationOptions(),
  );

  const bindingsDeleteMutation = useMutation(
    orpcClientSideQueryClient.core.bindings.delete.mutationOptions({
      meta: {
        awaits: [
          orpcClientSideQueryClient.core.playlists.get.key({
            input: playlistsGetInput,
          }),
        ],
      },
    }),
  );

  const handleDeletePlaylist = useCallback(async () => {
    try {
      await playlistsDeleteMutation.mutateAsync({ id: id });
    } catch (error) {
      if (isOrpcDefinedError(error) && error.code === "NOT_FOUND") {
        notifications.warning({
          message: msg({ message: "Playlist already deleted" }),
        });

        router.push("/playlists");
        return;
      }

      notifications.error({
        message: msg({ message: "An unexpected error occurred" }),
      });
      throw error;
    }

    notifications.success({ message: msg({ message: "Playlist deleted" }) });
    router.push("/playlists");
  }, [
    id,
    notifications.error,
    notifications.success,
    notifications.warning,
    playlistsDeleteMutation.mutateAsync,
    router,
  ]);

  const handleDeleteBinding = useCallback(
    async (id: string) => {
      try {
        await bindingsDeleteMutation.mutateAsync({ id: id });
      } catch (error) {
        if (isOrpcDefinedError(error) && error.code === "NOT_FOUND") {
          notifications.warning({
            message: msg({ message: "Media already removed" }),
          });
          return;
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });
        throw error;
      }

      notifications.success({ message: msg({ message: "Media removed" }) });
    },
    [
      bindingsDeleteMutation.mutateAsync,
      notifications.error,
      notifications.success,
      notifications.warning,
    ],
  );

  const playlist = playlistsGetQuery.data as SetNonNullableDeep<
    typeof playlistsGetQuery.data,
    "bindings" | "bindings.0.media" | "bindings.0.playlist"
  >;

  const bindings = playlist.bindings;
  const bindingsIds = bindings.map((binding) => binding.id);

  const deleteBindingHandlers = useDeepCompareMemo(
    () => bindingsIds.map((id) => async () => await handleDeleteBinding(id)),
    [bindingsIds, handleDeleteBinding],
  );

  return (
    <>
      <MoveMonitor playlist={playlist} />
      <Stack h="100%" w="100%">
        <Title ta="center">{playlist.name}</Title>
        {bindings.length === 0 ? (
          <EmptyNotice />
        ) : (
          <List style={{ overflowY: "auto" }}>
            {bindings.map((binding, index) => (
              <BindingItem
                binding={binding}
                index={index}
                key={binding.id}
                onDelete={deleteBindingHandlers[index]}
                position={order === "asc" ? index + 1 : bindings.length - index}
                total={bindings.length}
              />
            ))}
          </List>
        )}
        <Button
          component={Link}
          href={`/playlists/${playlist.id}/edit`}
          mt="auto"
          style={{ flexShrink: 0 }}
        >
          {localization.localize(msg({ message: "Edit" }))}
        </Button>
        <Button
          color="ra-red"
          onClick={handleDeletePlaylist}
          style={{ flexShrink: 0 }}
        >
          {localization.localize(msg({ message: "Delete" }))}
        </Button>
        <Button
          color="gray"
          component={Link}
          href="/playlists"
          style={{ flexShrink: 0 }}
          variant="light"
        >
          {localization.localize(msg({ message: "Back" }))}
        </Button>
      </Stack>
    </>
  );
}
