"use client";

import { msg } from "@lingui/core/macro";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

import type { MediaWidgetInput, MediaWidgetState } from "./types";

import { getValidationIssue } from "../../../../common/orpc/lib/get-validation-issue";
import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import { DisplayMediaWidget } from "./components/display-media-widget";
import {
  EditMediaWidget,
  type EditMediaWidgetSaveInput,
} from "./components/edit-media-widget";
import {
  UploadMediaWidget,
  type UploadMediaWidgetUploadInput,
} from "./components/upload-media-widget";

export function MediaWidget({ limit, order }: MediaWidgetInput) {
  const [state, setState] = useState<MediaWidgetState>({ state: "display" });
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>();

  const { notifications } = useNotifications();

  const mediaListInput = useMemo(
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

  const mediaListQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.media.list.queryOptions({
      input: mediaListInput,
    }),
  );

  const mediaCreateMutation = useMutation(
    orpcClientSideQueryClient.core.media.create.mutationOptions({
      meta: {
        awaits: [
          orpcClientSideQueryClient.core.media.list.key({
            input: mediaListInput,
          }),
        ],
      },
    }),
  );

  const mediaUpdateMutation = useMutation(
    orpcClientSideQueryClient.core.media.update.mutationOptions({
      meta: {
        awaits: [
          orpcClientSideQueryClient.core.media.list.key({
            input: mediaListInput,
          }),
        ],
      },
    }),
  );

  const mediaDeleteMutation = useMutation(
    orpcClientSideQueryClient.core.media.delete.mutationOptions({
      meta: {
        awaits: [
          orpcClientSideQueryClient.core.media.list.key({
            input: mediaListInput,
          }),
        ],
      },
    }),
  );

  const maxPage = Math.max(1, Math.ceil(mediaListQuery.data.count / limit));

  if (page > maxPage) setPage(maxPage);

  const handleDisplayDelete = useCallback(
    async (id: string) => {
      try {
        await mediaDeleteMutation.mutateAsync({ id: id });
      } catch (error) {
        if (isOrpcDefinedError(error) && error.code === "NOT_FOUND") {
          notifications.warning({
            message: msg({ message: "Media already deleted" }),
          });
          return;
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });
        throw error;
      }

      notifications.success({ message: msg({ message: "Media deleted" }) });
    },
    [mediaDeleteMutation.mutateAsync, notifications],
  );

  const handleDisplayEdit = useCallback(
    (id: string) => {
      const media = mediaListQuery.data.media.find((media) => media.id === id);
      if (media) setState({ media: media, state: "edit" });
    },
    [mediaListQuery.data.media],
  );

  const handleDisplayPageChange = useCallback(
    (page: number) => {
      const newPage = Math.max(1, Math.min(page, maxPage));

      if (newPage > 1)
        void queryClient.prefetchQuery(
          orpcClientSideQueryClient.core.media.list.queryOptions({
            input: {
              ...mediaListInput,
              offset: (newPage - 2) * limit,
            },
          }),
        );

      if (newPage < maxPage)
        void queryClient.prefetchQuery(
          orpcClientSideQueryClient.core.media.list.queryOptions({
            input: {
              ...mediaListInput,
              offset: newPage * limit,
            },
          }),
        );

      setPage(newPage);
    },
    [limit, maxPage, mediaListInput, queryClient],
  );

  const handleDisplayQueryChange = useCallback((query: string) => {
    setQuery(query || undefined);
    setPage(1);
  }, []);

  const handleDisplayUpload = useCallback(() => {
    setState({ state: "upload" });
  }, []);

  const handleEditBack = useCallback(() => {
    setState({ state: "display" });
    void mediaListQuery.refetch();
  }, [mediaListQuery.refetch]);

  const handleEditSave = useCallback(
    async ({ values }: EditMediaWidgetSaveInput) => {
      if (state.state !== "edit") return;

      try {
        const media = await mediaUpdateMutation.mutateAsync({
          data: { name: values.name },
          id: state.media.id,
        });

        notifications.success({ message: msg({ message: "Media updated" }) });

        setState({ state: "display" });

        return { values: { name: media.name } };
      } catch (error) {
        if (isOrpcDefinedError(error)) {
          if (error.code === "BAD_REQUEST") {
            notifications.error({ message: msg({ message: "Invalid input" }) });

            return {
              errors: {
                name: getValidationIssue({ error: error, path: "data.name" })
                  .message,
              },
            };
          }

          if (error.code === "NOT_FOUND") {
            notifications.error({
              message: msg({ message: "Media no longer exists" }),
            });

            setState({ state: "display" });
            return;
          }

          if (error.code === "CONFLICT") {
            notifications.error({
              message: msg({ message: "Conflicting input" }),
            });

            return;
          }
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });

        throw error;
      }
    },
    [
      mediaUpdateMutation.mutateAsync,
      notifications.error,
      notifications.success,
      state,
    ],
  );

  const handleUploadBack = useCallback(() => {
    setState({ state: "display" });
    void mediaListQuery.refetch();
  }, [mediaListQuery.refetch]);

  const handleUploadUpload = useCallback(
    async ({ values }: UploadMediaWidgetUploadInput) => {
      if (!values.file) {
        notifications.error({ message: msg({ message: "Invalid input" }) });
        return { errors: { file: msg({ message: "File is required" }) } };
      }

      const { errors, media } = await (async () => {
        try {
          const media = await mediaCreateMutation.mutateAsync({
            data: { name: values.name },
          });

          return { media: media };
        } catch (error) {
          if (isOrpcDefinedError(error)) {
            if (error.code === "BAD_REQUEST") {
              notifications.error({
                message: msg({ message: "Invalid input" }),
              });

              return {
                errors: {
                  name: getValidationIssue({ error: error, path: "data.name" })
                    .message,
                },
              };
            }

            if (error.code === "CONFLICT") {
              notifications.error({
                message: msg({ message: "Conflicting input" }),
              });

              return {};
            }
          }

          notifications.error({
            message: msg({ message: "An unexpected error occurred" }),
          });

          throw error;
        }
      })();

      if (errors) return { errors: errors };
      if (!media) return;

      const uploadResponse = await fetch(`/api/media/${media.id}`, {
        body: values.file,
        method: "PUT",
      });

      if (!uploadResponse.ok) {
        if (uploadResponse.status === 400) {
          notifications.error({ message: msg({ message: "Invalid input" }) });
          return { errors: { file: msg({ message: "Invalid file" }) } };
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });
        return;
      }

      notifications.success({ message: msg({ message: "Media uploaded" }) });
      setState({ state: "display" });

      return { values: { file: values.file, name: media.name } };
    },
    [
      mediaCreateMutation.mutateAsync,
      notifications.error,
      notifications.success,
    ],
  );

  switch (state.state) {
    case "display":
      return (
        <DisplayMediaWidget
          limit={limit}
          media={mediaListQuery.data.media}
          onDelete={handleDisplayDelete}
          onEdit={handleDisplayEdit}
          onPageChange={handleDisplayPageChange}
          onQueryChange={handleDisplayQueryChange}
          onUpload={handleDisplayUpload}
          page={page}
          query={query}
          total={mediaListQuery.data.count}
        />
      );
    case "edit":
      return (
        <EditMediaWidget
          media={state.media}
          onBack={handleEditBack}
          onSave={handleEditSave}
        />
      );
    case "upload":
      return (
        <UploadMediaWidget
          onBack={handleUploadBack}
          onUpload={handleUploadUpload}
        />
      );
  }
}
