"use client";

import { msg } from "@lingui/core/macro";
import { Button, Stack, Title } from "@mantine/core";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import type { EditPlaylistWidgetInput } from "./types";

import { getValidationIssue } from "../../../../common/orpc/lib/get-validation-issue";
import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import {
  EditPlaylistForm,
  type EditPlaylistFormSubmitInput,
} from "./components/edit-playlist-form";

export function EditPlaylistWidget({ id }: EditPlaylistWidgetInput) {
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const playlistsGetQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.playlists.get.queryOptions({
      input: { id: id },
    }),
  );

  const playlistsUpdateMutation = useMutation(
    orpcClientSideQueryClient.core.playlists.update.mutationOptions(),
  );

  const initialValues = useMemo(
    () => ({ name: playlistsGetQuery.data.name }),
    [playlistsGetQuery.data.name],
  );

  const handleSave = useCallback(
    async ({ values }: EditPlaylistFormSubmitInput) => {
      if (saving) return;

      setSaving(true);

      try {
        const playlist = await playlistsUpdateMutation.mutateAsync({
          data: { name: values.name },
          id: playlistsGetQuery.data.id,
        });

        notifications.success({
          message: msg({ message: "Playlist updated" }),
        });

        router.push(`/playlists/${playlist.id}`);

        return { values: { name: playlist.name } };
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
      } finally {
        setSaving(false);
      }
    },
    [
      notifications.error,
      notifications.success,
      playlistsGetQuery.data.id,
      playlistsUpdateMutation.mutateAsync,
      router,
      saving,
    ],
  );

  const handleError = useCallback(() => {
    notifications.error({ message: msg({ message: "Invalid input" }) });
  }, [notifications.error]);

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Edit playlist" }))}
      </Title>
      <EditPlaylistForm
        initialValues={initialValues}
        onError={handleError}
        onSubmit={handleSave}
      />
      <Button
        color="gray"
        component={Link}
        disabled={saving}
        href={`/playlists/${playlistsGetQuery.data.id}`}
        style={{ flexShrink: 0 }}
        variant="light"
      >
        {localization.localize(msg({ message: "Back" }))}
      </Button>
    </Stack>
  );
}
