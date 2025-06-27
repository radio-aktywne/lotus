"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { createBinding } from "../../../../actions/pelican/bindings/create-binding";
import { useGetPlaylist } from "../../../../hooks/pelican/playlists/use-get-playlist";
import { useToasts } from "../../../../hooks/use-toasts";
import {
  PlaylistAddForm,
  PlaylistAddFormData,
} from "./components/playlist-add-form";
import { PlaylistAddWidgetInput } from "./types";

export function PlaylistAddWidget({
  playlist: prefetchedPlaylist,
  ...props
}: PlaylistAddWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentPlaylist, error } = useGetPlaylist(props);
  const playlist = currentPlaylist ?? prefetchedPlaylist;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleAddAfterValidation = useCallback(
    async (media: string, rank: string) => {
      const { error: createBindingError } = await createBinding({
        media: media,
        playlist: playlist.id,
        rank: rank,
      });

      if (createBindingError) {
        const translated = _(createBindingError);
        toasts.error(translated);
        router.refresh();
        return { media: translated, rank: translated };
      }

      toasts.success(
        _(msg({ message: "Media added to playlist successfully" })),
      );
      router.push(`/playlists/${playlist.id}`);
    },
    [_, playlist, router, toasts],
  );

  const handleAdd = useCallback(
    async (data: PlaylistAddFormData) => {
      if (!data.media)
        return { media: _(msg({ message: "Media is required" })) };

      if (!data.rank) return { rank: _(msg({ message: "Rank is required" })) };

      return handleAddAfterValidation(data.media, data.rank);
    },
    [_, handleAddAfterValidation],
  );

  return <PlaylistAddForm onAdd={handleAdd} />;
}
