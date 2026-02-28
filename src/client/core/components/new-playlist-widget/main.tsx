"use client";

import { msg } from "@lingui/core/macro";
import { Button, Stack, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import type { NewPlaylistWidgetInput } from "./types";

import { getValidationIssue } from "../../../../common/orpc/lib/get-validation-issue";
import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import {
  CreatePlaylistForm,
  type CreatePlaylistFormSubmitInput,
} from "./components/create-playlist-form";

export function NewPlaylistWidget({}: NewPlaylistWidgetInput) {
  const [creating, setCreating] = useState(false);

  const router = useRouter();

  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const playlistsCreateMutation = useMutation(
    orpcClientSideQueryClient.core.playlists.create.mutationOptions(),
  );

  const initialValues = useMemo(() => ({ name: "" }), []);

  const handleCreate = useCallback(
    async ({ values }: CreatePlaylistFormSubmitInput) => {
      if (creating) return;

      setCreating(true);

      try {
        const playlist = await playlistsCreateMutation.mutateAsync({
          data: { name: values.name },
        });

        notifications.success({
          message: msg({ message: "Playlist created" }),
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
        setCreating(false);
      }
    },
    [
      creating,
      notifications.error,
      notifications.success,
      playlistsCreateMutation.mutateAsync,
      router,
    ],
  );

  const handleError = useCallback(() => {
    notifications.error({ message: msg({ message: "Invalid input" }) });
  }, [notifications.error]);

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Create playlist" }))}
      </Title>
      <CreatePlaylistForm
        initialValues={initialValues}
        onError={handleError}
        onSubmit={handleCreate}
      />
      <Button
        color="gray"
        component={Link}
        disabled={creating}
        href="/playlists"
        style={{ flexShrink: 0 }}
        variant="light"
      >
        {localization.localize(msg({ message: "Back" }))}
      </Button>
    </Stack>
  );
}
