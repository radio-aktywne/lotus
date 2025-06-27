"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { updatePlaylist } from "../../../../actions/pelican/playlists/update-playlist";
import { useGetPlaylist } from "../../../../hooks/pelican/playlists/use-get-playlist";
import { useToasts } from "../../../../hooks/use-toasts";
import {
  EditPlaylistForm,
  EditPlaylistFormData,
} from "./components/edit-playlist-form";
import { EditPlaylistWidgetInput } from "./types";

export function EditPlaylistWidget({
  playlist: prefetchedPlaylist,
  ...props
}: EditPlaylistWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentPlaylist, error } = useGetPlaylist(props);
  const playlist = currentPlaylist ?? prefetchedPlaylist;

  const initialData = { name: playlist.name };

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleSaveAfterValidation = useCallback(
    async (name: string) => {
      const { error: updateError } = await updatePlaylist({
        data: { name: name },
        id: playlist.id,
      });

      if (updateError) {
        const translated = _(updateError);
        toasts.error(translated);
        router.refresh();
        return { name: translated };
      }

      toasts.success(_(msg({ message: "Playlist updated successfully" })));
      router.push(`/playlists/${playlist.id}`);
    },
    [_, playlist, router, toasts],
  );

  const handleSave = useCallback(
    async (data: EditPlaylistFormData) => {
      if (!data.name) return { name: _(msg({ message: "Name is required" })) };

      return handleSaveAfterValidation(data.name);
    },
    [_, handleSaveAfterValidation],
  );

  return <EditPlaylistForm initialData={initialData} onSave={handleSave} />;
}
