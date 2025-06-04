"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Loader, Select, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useBindingForm,
  UseBindingFormValues,
} from "../../../../../../hooks/forms/use-binding-form";
import { useListMedia } from "../../../../../../hooks/pelican/media/use-list-media";
import { useListPlaylists } from "../../../../../../hooks/pelican/playlists/use-list-playlists";
import { CreateBindingFormInput } from "./types";
import { getMediaLabel, getPlaylistLabel } from "./utils";

export function CreateBindingForm({
  onCreate,
  validate,
}: CreateBindingFormInput) {
  const [creating, setCreating] = useState(false);

  const { _ } = useLingui();

  const { data: media, loading: mediaLoading } = useListMedia();
  const { data: playlists, loading: playlistsLoading } = useListPlaylists();

  const { form } = useBindingForm({ validate: validate });

  const formSetErrors = form.setErrors;

  const handleCreate = useCallback(
    async (data: UseBindingFormValues) => {
      setCreating(true);
      try {
        const errors = await onCreate?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setCreating(false);
      }
    },
    [formSetErrors, onCreate],
  );

  if (mediaLoading || playlistsLoading) return <Loader />;

  const mediaSelectData = media?.media.map((m) => ({
    label: getMediaLabel(m),
    value: m.id,
  }));

  const playlistSelectData = playlists?.playlists.map((playlist) => ({
    label: getPlaylistLabel(playlist),
    value: playlist.id,
  }));

  return (
    <form onSubmit={form.onSubmit(handleCreate)}>
      <Stack>
        <Select
          data={mediaSelectData}
          label={_(msg({ message: "Media" }))}
          required={true}
          {...form.getInputProps("media")}
        />
        <Select
          data={playlistSelectData}
          label={_(msg({ message: "Playlist" }))}
          required={true}
          {...form.getInputProps("playlist")}
        />
        <TextInput
          label={_(msg({ message: "Rank" }))}
          required={true}
          {...form.getInputProps("rank")}
        />
        <Button loading={creating} type="submit">
          {_(msg({ message: "Create" }))}
        </Button>
      </Stack>
    </form>
  );
}
