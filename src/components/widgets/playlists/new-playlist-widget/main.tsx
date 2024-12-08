"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { createPlaylist } from "../../../../actions/pelican/playlists/create-playlist";
import { useToasts } from "../../../../hooks/use-toasts";
import {
  CreatePlaylistForm,
  CreatePlaylistFormData,
} from "./components/create-playlist-form";
import { NewPlaylistWidgetInput } from "./types";

export function NewPlaylistWidget({}: NewPlaylistWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const handleCreateAfterValidation = useCallback(
    async (name: string) => {
      const { data: playlist, error: createError } = await createPlaylist({
        name: name,
      });

      if (createError) {
        const translated = _(createError);
        toasts.error(translated);
        router.refresh();
        return { name: translated };
      }

      toasts.success(_(msg({ message: "Playlist created successfully" })));
      router.push(`/playlists/${playlist.id}`);
    },
    [_, router, toasts],
  );

  const handleCreate = useCallback(
    async (data: CreatePlaylistFormData) => {
      if (!data.name) return { name: _(msg({ message: "Name is required" })) };

      return handleCreateAfterValidation(data.name);
    },
    [_, handleCreateAfterValidation],
  );

  return <CreatePlaylistForm onCreate={handleCreate} />;
}
