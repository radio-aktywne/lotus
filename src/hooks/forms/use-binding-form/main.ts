import { useForm } from "@mantine/form";
import "client-only";
import { useMemo } from "react";

import { useListMedia } from "../../pelican/media/use-list-media";
import { useListPlaylists } from "../../pelican/playlists/use-list-playlists";
import { defaultValues, mediaLimit, playlistsLimit } from "./constants";
import {
  UseBindingFormInput,
  UseBindingFormOutput,
  UseBindingFormValues,
} from "./types";

export function useBindingForm({
  initialValues,
  validate,
}: UseBindingFormInput): UseBindingFormOutput {
  const form = useForm<UseBindingFormValues>({
    initialValues: {
      media: initialValues?.media ?? defaultValues.media,
      playlist: initialValues?.playlist ?? defaultValues.playlist,
      rank: initialValues?.rank ?? defaultValues.rank,
    },
    validate: validate,
  });

  const { data: media, loading: mediaLoading } = useListMedia({
    limit: mediaLimit,
  });
  const { data: playlists, loading: playlistsLoading } = useListPlaylists({
    limit: playlistsLimit,
  });

  const allowedValues = useMemo(
    () => ({
      media: media?.media.map((m) => m.id) ?? [],
      playlist: playlists?.playlists.map((p) => p.id) ?? [],
    }),
    [media, playlists],
  );

  return {
    allowedValues,
    defaultValues,
    form,
    loading: mediaLoading || playlistsLoading,
  };
}
