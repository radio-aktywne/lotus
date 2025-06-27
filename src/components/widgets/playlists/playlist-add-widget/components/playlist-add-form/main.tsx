"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Loader, Select, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import { useListMedia } from "../../../../../../hooks/pelican/media/use-list-media";
import {
  usePlaylistAddForm,
  UsePlaylistAddFormValues,
} from "./hooks/forms/use-playlist-add-form";
import { PlaylistAddFormInput } from "./types";
import { getMediaLabel } from "./utils";

export function PlaylistAddForm({ onAdd, validate }: PlaylistAddFormInput) {
  const [adding, setAdding] = useState(false);

  const { _ } = useLingui();

  const { data: media, loading: mediaLoading } = useListMedia();

  const { form } = usePlaylistAddForm({ validate: validate });

  const formSetErrors = form.setErrors;

  const handleAdd = useCallback(
    async (data: UsePlaylistAddFormValues) => {
      setAdding(true);
      try {
        const errors = await onAdd?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setAdding(false);
      }
    },
    [formSetErrors, onAdd],
  );

  if (mediaLoading) return <Loader />;

  const mediaSelectData = media?.media.map((m) => ({
    label: getMediaLabel(m),
    value: m.id,
  }));

  return (
    <form onSubmit={form.onSubmit(handleAdd)}>
      <Stack>
        <Select
          data={mediaSelectData}
          label={_(msg({ message: "Media" }))}
          required={true}
          {...form.getInputProps("media")}
        />
        <TextInput
          label={_(msg({ message: "Rank" }))}
          required={true}
          {...form.getInputProps("rank")}
        />
        <Button loading={adding} type="submit">
          {_(msg({ message: "Add" }))}
        </Button>
      </Stack>
    </form>
  );
}
