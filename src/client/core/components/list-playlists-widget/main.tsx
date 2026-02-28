"use client";

import { msg } from "@lingui/core/macro";
import { Button, Stack, Text, Title } from "@mantine/core";
import { List } from "@radio-aktywne/ui";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import type { ListPlaylistsWidgetInput } from "./types";

import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import { Controls } from "./components/controls";
import { PlaylistItem } from "./components/playlist-item";

export function ListPlaylistsWidget({
  limit,
  order,
  page,
  query,
}: ListPlaylistsWidgetInput) {
  const router = useRouter();
  const path = usePathname();
  const queryParameters = useSearchParams();

  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const playlistsListInput = useMemo(
    () => ({
      limit: limit,
      offset: (page - 1) * limit,
      order: order,
      where: query
        ? { name: { contains: query, mode: "insensitive" as const } }
        : undefined,
    }),
    [limit, order, page, query],
  );

  const queryClient = useQueryClient();

  const playlistsListQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.playlists.list.queryOptions({
      input: playlistsListInput,
    }),
  );

  const playlistsDeleteMutation = useMutation(
    orpcClientSideQueryClient.core.playlists.delete.mutationOptions({
      meta: {
        awaits: [
          orpcClientSideQueryClient.core.playlists.list.key({
            input: playlistsListInput,
          }),
        ],
      },
    }),
  );

  const maxPage = Math.max(1, Math.ceil(playlistsListQuery.data.count / limit));

  useEffect(() => {
    if (page > maxPage) {
      const newQueryParameters = new URLSearchParams(queryParameters);
      newQueryParameters.set("page", `${maxPage}`);

      const queryString = newQueryParameters.toString();
      router.push(path + queryString ? `?${queryString}` : "");
    }
  }, [maxPage, page, path, queryParameters, router]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await playlistsDeleteMutation.mutateAsync({ id: id });
      } catch (error) {
        if (isOrpcDefinedError(error) && error.code === "NOT_FOUND") {
          notifications.warning({
            message: msg({ message: "Playlist already deleted" }),
          });
          return;
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });
        throw error;
      }

      notifications.success({ message: msg({ message: "Playlist deleted" }) });
    },
    [
      notifications.error,
      notifications.success,
      notifications.warning,
      playlistsDeleteMutation.mutateAsync,
    ],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const newPage = Math.max(1, Math.min(page, maxPage));

      if (newPage > 1)
        void queryClient.prefetchQuery(
          orpcClientSideQueryClient.core.playlists.list.queryOptions({
            input: {
              ...playlistsListInput,
              offset: (newPage - 2) * limit,
            },
          }),
        );

      if (newPage < maxPage)
        void queryClient.prefetchQuery(
          orpcClientSideQueryClient.core.playlists.list.queryOptions({
            input: {
              ...playlistsListInput,
              offset: newPage * limit,
            },
          }),
        );

      const newQueryParameters = new URLSearchParams(queryParameters);
      newQueryParameters.set("page", `${newPage}`);

      const queryString = newQueryParameters.toString();
      router.push(path + queryString ? `?${queryString}` : "");
    },
    [
      limit,
      maxPage,
      path,
      playlistsListInput,
      queryClient,
      queryParameters,
      router,
    ],
  );

  const handleQueryChange = useCallback(
    (query: string) => {
      const newQueryParameters = new URLSearchParams(queryParameters);
      newQueryParameters.delete("page");

      if (query) {
        newQueryParameters.set("query", query);
      } else {
        newQueryParameters.delete("query");
      }

      const queryString = newQueryParameters.toString();
      router.push(path + queryString ? `?${queryString}` : "");
    },
    [path, queryParameters, router],
  );

  const playlists = playlistsListQuery.data.playlists;
  const playlistsIds = playlists.map((playlist) => playlist.id);

  const deleteHandlers = useDeepCompareMemo(
    () => playlistsIds.map((id) => async () => await handleDelete(id)),
    [playlistsIds, handleDelete],
  );

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Playlists" }))}
      </Title>
      <Controls
        onPageChange={handlePageChange}
        onQueryChange={handleQueryChange}
        page={page}
        pages={maxPage}
        query={query}
      />
      {playlistsListQuery.data.count === 0 ? (
        <Text py="sm" size="xs" ta="center">
          {localization.localize(msg({ message: "No playlists" }))}
        </Text>
      ) : (
        <List style={{ overflowY: "auto" }}>
          {playlists.map((playlist, index) => (
            <PlaylistItem
              key={playlist.id}
              onDelete={deleteHandlers[index]}
              playlist={playlist}
            />
          ))}
        </List>
      )}
      <Button
        component={Link}
        href="/playlists/new"
        mt="auto"
        style={{ flexShrink: 0 }}
      >
        {localization.localize(msg({ message: "Create" }))}
      </Button>
    </Stack>
  );
}
