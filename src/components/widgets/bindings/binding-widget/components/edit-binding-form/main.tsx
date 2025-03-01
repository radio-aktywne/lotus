"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Loader, Select, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useBindingForm,
  UseBindingFormValues,
} from "../../../../../../hooks/forms/use-binding-form";
import { EditBindingFormInput } from "./types";
import { getMediaLabel, getPlaylistLabel } from "./utils";

export function EditBindingForm({
  initialData,
  onDelete,
  onSave,
  validate,
}: EditBindingFormInput) {
  const [saving, setSaving] = useState(false);

  const { _ } = useLingui();

  const { allowedValues, form, loading } = useBindingForm({
    initialValues: initialData,
    validate: validate,
  });

  const formSetErrors = form.setErrors;

  const handleSave = useCallback(
    async (data: UseBindingFormValues) => {
      setSaving(true);
      try {
        const errors = await onSave?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setSaving(false);
      }
    },
    [formSetErrors, onSave],
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
    <form onSubmit={form.onSubmit(handleSave)}>
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
        <Button loading={saving} type="submit">
          {_(msg({ message: "Save" }))}
        </Button>
        <Button color="red" onClick={onDelete}>
          {_(msg({ message: "Delete" }))}
        </Button>
      </Stack>
    </form>
  );
}
