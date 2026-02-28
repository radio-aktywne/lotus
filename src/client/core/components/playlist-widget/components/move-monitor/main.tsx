import { msg } from "@lingui/core/macro";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import type {
  BindingsModelsBinding,
  MediaModelsMedia,
} from "../../../../../../common/apis/pelican/types";
import type { MoveMonitorInput } from "./types";

import { isOrpcDefinedError } from "../../../../../../common/orpc/lib/is-orpc-defined-error";
import { useNotifications } from "../../../../../../isomorphic/notifications/hooks/use-notifications";
import {
  useDropMonitor,
  type UseDropMonitorDropData,
} from "../../../../../drag-and-drop/hooks/use-drop-monitor";
import { orpcClientSideQueryClient } from "../../../../../orpc/vars/clients";
import { findWithNeighbours, getRankBetween } from "./utils";

export function MoveMonitor({ playlist }: MoveMonitorInput) {
  const { notifications } = useNotifications();

  const createBindingMutation = useMutation(
    orpcClientSideQueryClient.core.bindings.create.mutationOptions(),
  );

  const updateBindingMutation = useMutation(
    orpcClientSideQueryClient.core.bindings.update.mutationOptions(),
  );

  const handleChangeMediaPosition = useCallback(
    async ({
      edge,
      source,
      target,
    }: UseDropMonitorDropData<
      BindingsModelsBinding,
      BindingsModelsBinding
    >) => {
      if (source.data.id === target.data.id) return;

      const { item, next, previous } = findWithNeighbours(
        playlist.bindings,
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

      try {
        await updateBindingMutation.mutateAsync({
          data: { rank: rank },
          id: source.data.id,
        });
      } catch (error) {
        if (
          isOrpcDefinedError(error) &&
          (error.code === "NOT_FOUND" || error.code === "CONFLICT")
        ) {
          notifications.error({
            message: msg({
              message: "Failed to change media position, try again",
            }),
          });

          return;
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });
        throw error;
      }

      notifications.success({
        message: msg({ message: "Media position changed" }),
      });
    },
    [
      notifications.error,
      notifications.success,
      playlist.bindings,
      updateBindingMutation.mutateAsync,
    ],
  );

  const handleMoveMediaToPlaylist = useCallback(
    async ({
      edge,
      source,
      target,
    }: UseDropMonitorDropData<MediaModelsMedia, BindingsModelsBinding>) => {
      const { item, next, previous } = findWithNeighbours(
        playlist.bindings,
        (binding) => binding.id === target.data.id,
      );

      if (!item) return;

      const rank =
        edge === "top"
          ? getRankBetween(previous?.rank, item.rank)
          : getRankBetween(item.rank, next?.rank);

      try {
        await createBindingMutation.mutateAsync({
          data: {
            mediaId: source.data.id,
            playlistId: playlist.id,
            rank: rank,
          },
        });
      } catch (error) {
        if (isOrpcDefinedError(error) && error.code === "CONFLICT") {
          notifications.error({
            message: msg({
              message: "Failed to add media to playlist, try again",
            }),
          });

          return;
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });
        throw error;
      }

      notifications.success({
        message: msg({ message: "Media added to playlist" }),
      });
    },
    [
      createBindingMutation.mutateAsync,
      notifications.error,
      notifications.success,
      playlist.id,
      playlist.bindings,
    ],
  );

  const handleMoveMediaToEmptyPlaylist = useCallback(
    async ({ source }: UseDropMonitorDropData<MediaModelsMedia>) => {
      try {
        await createBindingMutation.mutateAsync({
          data: {
            mediaId: source.data.id,
            playlistId: playlist.id,
            rank: getRankBetween(undefined, undefined),
          },
        });
      } catch (error) {
        if (isOrpcDefinedError(error) && error.code === "CONFLICT") {
          notifications.error({
            message: msg({
              message: "Failed to add media to playlist, try again",
            }),
          });

          return;
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });
        throw error;
      }

      notifications.success({
        message: msg({ message: "Media added to playlist" }),
      });
    },
    [
      createBindingMutation.mutateAsync,
      notifications.error,
      notifications.success,
      playlist.id,
    ],
  );

  useDropMonitor({
    onDrop: handleChangeMediaPosition,
    source: "binding",
    target: "binding",
  });

  useDropMonitor({
    onDrop: handleMoveMediaToPlaylist,
    source: "media",
    target: "binding",
  });

  useDropMonitor({
    onDrop: handleMoveMediaToEmptyPlaylist,
    source: "media",
    target: "empty-playlist",
  });

  return null;
}
