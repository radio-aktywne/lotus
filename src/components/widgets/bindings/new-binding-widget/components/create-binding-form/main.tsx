"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Loader, Select, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useBindingForm,
  UseBindingFormValues,
} from "../../../../../../hooks/forms/use-binding-form";
import { CreateBindingFormInput } from "./types";
import { getMediaLabel, getPlaylistLabel } from "./utils";

export function CreateBindingForm({
  onCreate,
  validate,
}: CreateBindingFormInput) {
  const [creating, setCreating] = useState(false);

  const { _ } = useLingui();

  const { allowedValues, form, loading } = useBindingForm({
    validate: validate,
  });

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

  if (loading) return <Loader />;

  const mediaSelectData = allowedValues.media.map((value) => ({
    label: getMediaLabel(value),
    value: value,
  }));

  const playlistSelectData = allowedValues.playlist.map((value) => ({
    label: getPlaylistLabel(value),
    value: value,
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
