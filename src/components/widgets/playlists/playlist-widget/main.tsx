"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { deletePlaylist } from "../../../../actions/pelican/playlists/delete-playlist";
import { updatePlaylist } from "../../../../actions/pelican/playlists/update-playlist";
import { useGetPlaylist } from "../../../../hooks/pelican/playlists/use-get-playlist";
import { useToasts } from "../../../../hooks/use-toasts";
import {
  EditPlaylistForm,
  EditPlaylistFormData,
} from "./components/edit-playlist-form";
import { PlaylistWidgetInput } from "./types";

export function PlaylistWidget({
  playlist: prefetchedPlaylist,
}: PlaylistWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentPlaylist, error } = useGetPlaylist({
    id: prefetchedPlaylist.id,
  });
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
      router.refresh();
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

  const handleDelete = useCallback(async () => {
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
    <EditPlaylistForm
      initialData={initialData}
      onDelete={handleDelete}
      onSave={handleSave}
    />
  );
}
